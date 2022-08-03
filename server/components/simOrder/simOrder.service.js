import { ERROR_CODE, SETTING_TYPE, STATUS_ORDER, STATUS_SELL_SIM, SUCCESS_CODE, TYPE_LOGIN, TYPE_ORDER_SIM_PRODUCT } from "../../../external/constants/constants";
import { error500, errorMessage } from "../../../external/util/error";
import { getStaffInfo, getStoreInfo, getUserInfo, getUserInfoByCode } from "../../../internal/grpc/user/request";
import { getWallet, updateVeticFromOrder } from "../../../internal/grpc/wallet/request";
import { getSettingDAO } from "../admin/settings/settings.dao";
import { generateQR } from "../order/order.service";
import { getReport } from "../order/reportOrder.dao";
import { getSimsDAO, getSimUnlimitDAO } from "../sim/sim.dao";
import { createSiMallAccDAO, getSimMallAccDAO } from "../simMallAccount/simMallAccount.dao";
import { createSimOrderDAO } from './simOrder.dao';
import { updateVeticFromOrderSim } from '../../../internal/grpc/wallet/request';
import { profile } from "winston";

export async function createSimOrder(data, auth) {
    try {
        const simMallAcc = await getSimMallAccDAO({ user: auth?.storeId ? auth.storeId : auth._id });
        if (!simMallAcc) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND)
        const isArray = Array.isArray(data.simList);
        if (!isArray) {
            data.simList = [data.simList];
        }
        const simId = data.simList.map((item) => {
            return item._id;
        });
        const hasSim = await getSimUnlimitDAO({ _id: { $in: simId } });
        if (hasSim.length !== simId.length) return errorMessage(404, ERROR_CODE.SIM_NOT_FOUND);
        let referUser;
        if (auth?.storeId) {
            const storeInfo = await getStoreInfo(auth.storeId);
            referUser = await getUserInfo(storeInfo.userId);
        } else {
            referUser = await getUserInfo(auth._id);
        }
        if (!referUser) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const promise = await Promise.all([getUserInfo(referUser.refer), getUserInfoByCode(data.code)]);
        if (!promise[1]._id) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        let storeIdOwner;
        if (auth?.storeId) {
            storeIdOwner = await getStoreInfo(auth.storeId);
        }
        const buyerInfo = await getUserInfo(promise[1].refer);
        let status = STATUS_ORDER.PENDING;
        data.totalVetic = 0;
        data.simList.forEach((simItem) => {
            data.totalVetic += parseInt(simItem.price * 10 * parseInt(simItem.special) / 100)
        });
        let walletValue = await getWallet(simMallAcc.user, auth?.storeId ? 'STORE' : 'USER');
        walletValue = JSON.parse(walletValue.wallet);
        if (walletValue.money < (parseInt(data.totalVetic)) / 10) return errorMessage(403, ERROR_CODE.MONEY_NOT_ENOUGH);
        if (walletValue.money >= (parseInt(data.totalVetic)) / 10) {
            status = STATUS_ORDER.MAIN;
        }
        if (Number(data?.typeSave) === STATUS_ORDER.DRAFT) {
            status = STATUS_ORDER.DRAFT;
        }
        const invoiceOrder = await getSettingDAO({ type: SETTING_TYPE.ORDER });
        const str = `${invoiceOrder.data.value}`;
        const pad = '00000000';
        const ans = pad.substring(0, pad.length - str.length) + str;
        invoiceOrder.data = {
            value: invoiceOrder.data.value + 1
        };
        await invoiceOrder.save();
        const qrCode = await generateQR(ans);
        const createNewOrder = await createSimOrderDAO({
            owner: {
                id: simMallAcc._id,
                address: simMallAcc.address,
                name: simMallAcc.name
            },
            buyer: promise[1]._id,
            ref_buy: {
                id: buyerInfo._id,
                fullName: buyerInfo.fullName,
                code: buyerInfo.code
            },
            ref_sell: {
                id: promise[0]._id,
                fullName: promise[0].fullName,
                code: promise[0].code
            },
            invoice: ans,
            description: data.description,
            totalVetic: data.totalVetic,
            totalPrice: data.totalPrice,
            status,
            note: data.note,
            qrCode,
            simList: data.simList
        });
        let order = {
            orderId: createNewOrder._id,
            total: createNewOrder.totalPrice,
            vetic: createNewOrder.totalVetic,
            userId: createNewOrder.buyer,
            sellId: createNewOrder.ref_sell.id,
            buyId: createNewOrder.ref_buy.id,
            storeId: auth?.storeId ? storeIdOwner._id : auth._id,
            storeUser: simMallAcc.owner,
            invoice: createNewOrder.invoice,
            typeOrder: TYPE_ORDER_SIM_PRODUCT.SIM,
            typeOwner: auth?.storeId ? TYPE_LOGIN.STORE : TYPE_LOGIN.USER
        };
        if (status === STATUS_ORDER.PENDING) {
            return errorMessage(403, SUCCESS_CODE.SAVE_WITH_PENDING, createNewOrder._id);
        }
        if (createNewOrder.status === STATUS_ORDER.MAIN && createNewOrder) {
            order = JSON.stringify(order);
            const dataReturn = await updateVeticFromOrder(order);
            if (dataReturn.success !== 'success') {
                createNewOrder.status = STATUS_ORDER.DRAFT;
                await createNewOrder.save();
                return createNewOrder;
            }
            const promiseSim = hasSim.map((item) => {
                data.simList.forEach(async (sim) => {
                    if (item._id.toString() === sim._id.toString()) {
                        item.status = STATUS_SELL_SIM.SOLD;
                        item.price = sim.price;
                        item.money = sim.money;
                        item.tax = sim.tax;
                        item.totalVetic = parseInt(sim.price * 10 * parseInt(sim.special) / 100) + parseInt(sim.vetic);
                        item.vetic = parseInt(sim.vetic)
                        await item.save();
                        await updateVeticFromOrderSim(item.sim, item.vetic);
                    }
                });
                return item;
            });
            await Promise.all(promiseSim);
            const report = await getReport({});
            await report.update({
                $inc: { value: 1 }
              });
        }
        return createNewOrder;
    } catch (error) {
        return error500(error);
    }
}

export async function updateSimFromOrder(user, body) {
    try {
        const isArray = Array.isArray(body.simList);
        if (!isArray) {
            body.simList = [body.simList];
        }
        const simId = body.simList.map((item) => {
            return item._id;
        });
        const hasSim = await getSimUnlimitDAO({ _id: { $in: simId } });
        if (hasSim.length !== body.simList.length) return errorMessage(404, ERROR_CODE.SIM_NOT_FOUND);
        let totalVetic = 0;
        const promiseSim = hasSim.map((item) => {
            body.simList.forEach(async (sim) => {
                if (item._id.toString() === sim._id.toString()) {
                    item.status = STATUS_SELL_SIM.SOLD;
                    item.price = sim.price;
                    item.money = sim.money;
                    item.tax = sim.tax;
                    item.vetic = parseInt(sim.vetic);
                    item.totalVetic = parseInt(sim.price * 10 * parseInt(sim.special) / 100) + parseInt(sim.vetic);
                    totalVetic += item.totalVetic;
                    await item.save();
                    await updateVeticFromOrderSim(item.sim, item.vetic);
                }
            });
            return item;
        });
        await Promise.all(promiseSim);
        return totalVetic;
    } catch (error) {
        return error500(error);
    }
}
