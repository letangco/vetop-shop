import QRCode from 'qrcode';
import slug from 'slug';
import {
    ERROR_CODE, STATUS_UPDATE_ORDER, TYPE_SETTING, SHARE_HOST, STATUS_ORDER, SUCCESS_CODE, TYPE_LOGIN, TYPE_VETIC, WALLET_TYPE, TYPE_SPECIAL, SETTING_TYPE, TYPE_ORDER_SIM_PRODUCT, ORDER_TYPE, TYPE_PAYMENT_ORDER
} from '../../../external/constants/constants';
import {
    error500, errorMessagAndValue, errorMessage, successMessage
} from '../../../external/util/error';
import {
    getStoreInfo, getUserInfo, getStaffInfo, getUserInfoByCode, updatePaymentLimitFromOrder, updatePaymentLimitStaff
} from '../../../internal/grpc/user/request';
import {
    countOrderByCond, createOrderDAO, findOneOrderByCond, findOrderByCond, uniqBuyer
} from './order.dao';
import { getSettingGRPC, getWallet, notificationCreatePendingOrder, updateVeticFromOrder, createPaymentVNPayOrder } from '../../../internal/grpc/wallet/request';
import { generateRandom6Digits } from '../../helpers/string.helper';
import { getSort, getSortOrder } from '../../../external/middleware/query';
import { GetFileData } from '../../../external/util/file';
import SettingOrder from './settingOrder.model';
import { getReport } from './reportOrder.dao';
import { getSettingDAO } from '../admin/settings/settings.dao';
import { TYPE_ORDER } from '../../constants';
import { getSimUnlimitDAO } from '../sim/sim.dao';

export async function createOrder(store, data) {
    try {
        console.log('data create order: ', data);
        if (!Object.values(TYPE_SPECIAL).includes(data.typeSpecial)) return errorMessage(400, ERROR_CODE.TYPE_VETIC_INCORRECT);
        data.total = parseInt(data.total);
        const multiNumberVetic = await getSettingGRPC(TYPE_SETTING.MULTIPLE_NUMBER_VETIC);
        const maxVetic = await getSettingGRPC(TYPE_SETTING.MAX_VETIC);
        let veticUser;
        if (data.typeSpecial === TYPE_SPECIAL.PERCENT) {
            if (data.special > 100) {
                return errorMessage(400, ERROR_CODE.PERCENT_VETIC_IS_NOT_GREATER_THAN_100);
            }
            data.vetic = parseInt(data.total * data.special / 100);
            // vetic user
            veticUser = data.total * parseInt(data.special) * parseInt(multiNumberVetic.value) / 100;
            if (veticUser > (data.total * parseInt(maxVetic.value) / 100)) { // max vetic: ex: 300%
                veticUser = data.total * parseInt(maxVetic.value) / 100;
            }
        } else {
            if (data.special > data.total) {
                return errorMessage(400, ERROR_CODE.VETIC_IS_NOT_GREATER_THAN_TOTAL);
            }
            data.vetic = parseInt(data.special);
            // vetic user
            veticUser = parseInt(data.special) * parseInt(multiNumberVetic.value) / 100;
            if (veticUser > (data.total * parseInt(maxVetic.value) / 100)) { // max vetic: ex: 300%
                veticUser = data.total * parseInt(maxVetic.value) / 100;
            }
        }
        // check info
        const storeInfo = await getStoreInfo(store.storeId);
        if (!storeInfo) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        const referUser = await getUserInfo(storeInfo.userId);
        if (!referUser) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const promise = await Promise.all([getUserInfo(referUser.refer), getUserInfoByCode(data.code)]);
        if (!promise[1]._id) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const buyerInfo = await getUserInfo(promise[1].refer);
        if (data.code.toString() === storeInfo.code.toString()) return errorMessage(403, ERROR_CODE.CAN_NOT_CREATE_ORDER_FOR_YOUR_SELF);
        const staff = store?.staffId ? await getStaffInfo(store.staffId) : null;
        console.log('store data: ', store);
        console.log('staff data: ', staff);
        if (staff?.userId) {
            const staffInfo = await getUserInfo(staff.userId);
            staff.id = staffInfo._id;
            staff.fullName = staffInfo.fullName;
            staff.code = staffInfo.code;
            if (data.code.toString() === staffInfo.code.toString()) return errorMessage(403, ERROR_CODE.CAN_NOT_CREATE_ORDER_FOR_YOUR_SELF);
        }
        let status = STATUS_ORDER.PENDING;
        let walletValue = await getWallet(storeInfo._id, 'STORE');
        walletValue = JSON.parse(walletValue.wallet);
        if (parseInt(walletValue.money) >= data.vetic) {
            status = STATUS_ORDER.MAIN;
        }
        if (staff?.paymentLimit) {
            if (staff.paymentLimit < data.total) return errorMessage(403, ERROR_CODE.NOT_ENOUGH_PAYMENT_LIMIT);
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
        let isMax = false;
        let bankInfo = {};
        // over order point
        const pointOrder = await getSettingDAO({ type: SETTING_TYPE.POINT_OVER_ORDER });
        if (data.vetic > pointOrder?.data?.value) {
            // if save draft
            if (Number(data?.typeSave) === STATUS_ORDER.DRAFT) {
                status = STATUS_ORDER.DRAFT;
            } else {
                status = STATUS_ORDER.WAITING_ADMIN;
            }
            isMax = true;
            const bankInfoAdmin = await getSettingDAO({ type: SETTING_TYPE.BANK_INFO });
            bankInfo = {
                ...bankInfoAdmin.data,
                content: `${ans} - ${promise[1].code}`
            };
        }
        // const searchString
        const searchString = slug(`${promise[1].code} ${storeInfo.code} ${ans}`, ' ');
        // ----------------------
        let createNewOrder = await createOrderDAO({
            store: {
                id: storeInfo._id,
                address: storeInfo.address,
                name: storeInfo.name
            },
            userId: promise[1]._id,
            staff: staff ? {
                id: staff._id,
                fullName: staff.fullName,
                code: staff.code
            } : null,
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
            total: data.total,
            special: data.special,
            typeSpecial: data.typeSpecial,
            vetic: data.vetic, // vetic seller
            status,
            note: data.note,
            qrCode,
            bankInfo,
            searchString,
            veticBuyer: veticUser,
        });
        if (status === STATUS_ORDER.WAITING_ADMIN) {
            // noti to buyer when order pending
            await notificationCreatePendingOrder(createNewOrder._id, storeInfo._id, createNewOrder.userId, createNewOrder.invoice, createNewOrder.total, createNewOrder.special, createNewOrder.vetic);
        }
        let order = {
            orderId: createNewOrder._id,
            total: createNewOrder.total,
            vetic: createNewOrder.vetic,
            special: createNewOrder.special,
            userId: createNewOrder.userId,
            sellId: createNewOrder.ref_sell.id,
            buyId: createNewOrder.ref_buy.id,
            storeId: storeInfo._id,
            storeUser: storeInfo.userId,
            invoice: createNewOrder.invoice,
            typeOwner: TYPE_LOGIN.STORE
        };
        // if (staff?._id) {
        //     console.log('paymentStaff: ', staff, createNewOrder.vetic);
        //     await updatePaymentLimitStaff(staff._id, createNewOrder.vetic);
        // }
        if (status === STATUS_ORDER.PENDING) {
            return errorMessagAndValue(403, SUCCESS_CODE.SAVE_WITH_PENDING, createNewOrder.total, createNewOrder._id);
        }
        if (createNewOrder.status === STATUS_ORDER.MAIN && createNewOrder) {
            order = JSON.stringify(order);
            const dataReturn = await updateVeticFromOrder(order);
            if (dataReturn.success !== 'success') {
                createNewOrder.status = STATUS_ORDER.DRAFT;
                await createNewOrder.save();
                createNewOrder = createNewOrder.toObject();
                createNewOrder.userId = promise[1];
                if (isMax) {
                    return {
                        order: createNewOrder,
                        orderMax: true
                    };
                }
                return {
                    order: createNewOrder,
                    orderMax: false
                };
            }
            const report = await getReport({});
            await report.update({
                $inc: { value: 1 }
            });
            if (staff?.paymentLimit) {
                // await updatePaymentLimitFromOrder(staff.storeId, staff._id, createNewOrder.total);
                await updatePaymentLimitFromOrder(staff.storeId, staff._id, createNewOrder.vetic);
            }
        }
        createNewOrder = createNewOrder.toObject();
        createNewOrder.userId = promise[1];
        if (isMax) {
            return {
                order: createNewOrder,
                orderMax: true
            };
        }
        return {
            order: createNewOrder,
            orderMax: false
        };
    } catch (error) {
        console.log(error);
        return error500(error);
    }
}

export async function createOrderNew(store, data) {
    try {
        if (!Object.values(TYPE_SPECIAL).includes(data.typeSpecial)) return errorMessage(400, ERROR_CODE.TYPE_VETIC_INCORRECT);
        data.total = parseInt(data.total);
        const multiNumberVetic = await getSettingGRPC(TYPE_SETTING.MULTIPLE_NUMBER_VETIC);
        const maxVetic = await getSettingGRPC(TYPE_SETTING.MAX_VETIC);
        let veticUser;
        if (data.typeSpecial === TYPE_SPECIAL.PERCENT) {
            if (data.special > 100) {
                return errorMessage(400, ERROR_CODE.PERCENT_VETIC_IS_NOT_GREATER_THAN_100);
            }
            data.vetic = parseInt(data.total * data.special / 100);
            // vetic user
            veticUser = data.total * parseInt(data.special) * parseInt(multiNumberVetic.value) / 100;
            if (veticUser > (data.total * parseInt(maxVetic.value) / 100)) { // max vetic: ex: 300%
                veticUser = data.total * parseInt(maxVetic.value) / 100;
            }
        } else {
            if (data.special > data.total) {
                return errorMessage(400, ERROR_CODE.VETIC_IS_NOT_GREATER_THAN_TOTAL);
            }
            data.vetic = parseInt(data.special);
            // vetic user
            veticUser = parseInt(data.special) * parseInt(multiNumberVetic.value) / 100;
            if (veticUser > (data.total * parseInt(maxVetic.value) / 100)) { // max vetic: ex: 300%
                veticUser = data.total * parseInt(maxVetic.value) / 100;
            }
        }
        // check info
        const storeInfo = await getStoreInfo(store.storeId);
        if (!storeInfo) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        const referUser = await getUserInfo(storeInfo.userId);
        if (!referUser) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const promise = await Promise.all([
            getUserInfo(referUser.refer),
            getUserInfoByCode(data.code)
        ]);
        if (!promise[1]._id) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const buyerInfo = await getUserInfo(promise[1].refer);
        if (data.code.toString() === storeInfo.code.toString()) return errorMessage(403, ERROR_CODE.CAN_NOT_CREATE_ORDER_FOR_YOUR_SELF);
        const staff = store?.staffId ? await getStaffInfo(store.staffId) : null;
        console.log('store data: ', store);
        console.log('staff data: ', staff);
        if (staff?.userId) {
            const staffInfo = await getUserInfo(staff.userId);
            staff.id = staffInfo._id;
            staff.fullName = staffInfo.fullName;
            staff.code = staffInfo.code;
            if (data.code.toString() === staffInfo.code.toString()) return errorMessage(403, ERROR_CODE.CAN_NOT_CREATE_ORDER_FOR_YOUR_SELF);
        }
        let status = STATUS_ORDER.TEMP;
        // case save draff
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
        let isMax = false;
        let bankInfo = {};
        // over order point
        const pointOrder = await getSettingDAO({ type: SETTING_TYPE.POINT_OVER_ORDER });
        if (data.vetic > pointOrder?.data?.value) {
            // if save draft
            if (Number(data?.typeSave) === STATUS_ORDER.DRAFT) {
                status = STATUS_ORDER.DRAFT;
            } else {
                status = STATUS_ORDER.WAITING_ADMIN;
            }
            isMax = true;
            const bankInfoAdmin = await getSettingDAO({ type: SETTING_TYPE.BANK_INFO });
            bankInfo = {
                ...bankInfoAdmin.data,
                content: `${ans} - ${promise[1].code}`
            };
        }
        // const searchString
        const searchString = slug(`${promise[1].code} ${storeInfo.code} ${ans}`, ' ');
        // ----------------------
        let createNewOrder = await createOrderDAO({
            store: {
                id: storeInfo._id,
                address: storeInfo.address,
                name: storeInfo.name
            },
            userId: promise[1]._id,
            staff: staff ? {
                id: staff._id,
                fullName: staff.fullName,
                code: staff.code
            } : null,
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
            total: data.total,
            special: data.special,
            typeSpecial: data.typeSpecial,
            vetic: data.vetic, // vetic seller
            status,
            note: data.note,
            qrCode,
            bankInfo,
            searchString,
            veticBuyer: veticUser,
        });
        await createNewOrder.save();
        if (status === STATUS_ORDER.WAITING_ADMIN) {
            // noti to buyer when order pending
            await notificationCreatePendingOrder(createNewOrder._id, storeInfo._id, createNewOrder.userId, createNewOrder.invoice, createNewOrder.total, createNewOrder.special, createNewOrder.vetic);
        }
        let order = {
            orderId: createNewOrder._id,
            total: createNewOrder.total,
            vetic: createNewOrder.vetic,
            special: createNewOrder.special,
            userId: createNewOrder.userId,
            sellId: createNewOrder.ref_sell.id,
            buyId: createNewOrder.ref_buy.id,
            storeId: storeInfo._id,
            storeUser: storeInfo.userId,
            invoice: createNewOrder.invoice,
            typeOwner: TYPE_LOGIN.STORE
        };
        // if (status === STATUS_ORDER.PENDING) {
        //     return errorMessagAndValue(403, SUCCESS_CODE.SAVE_WITH_PENDING, createNewOrder.total, createNewOrder._id);
        // }
        if (createNewOrder) {
            order = JSON.stringify(order);
            const report = await getReport({});
            await report.update({
                $inc: { value: 1 }
            });
        }
        createNewOrder = createNewOrder.toObject();
        createNewOrder.userId = promise[1];
        if (isMax) {
            return {
                order: createNewOrder,
                orderMax: true
            };
        }
        return {
            order: createNewOrder,
            orderMax: false
        };
    } catch (error) {
        console.log(error);
        return error500(error);
    }
}

export async function getOrders(storeId, query) {
    try {
        const cond = {
            'store.id': storeId
        };
        const sort = getSortOrder(query);
        if (query?.fromDay && query?.toDay) {
            cond.updatedAt = {
                $gte: new Date(query.fromDay).toISOString(),
                $lte: new Date(query.toDay).toISOString()
            };
        }
        if (query?.type) {
            cond.type = query.type;
        }
        if (query?.status) {
            cond.status = query.status;
        }
        const promise = await Promise.all([countOrderByCond(cond), findOrderByCond(cond, query, sort)]);
        if (promise[1].length > 0) {
            promise[1] = await getMetaDataOrder(promise[1]);
            return [promise[0], promise[1]];
        }
        return [0, []];
    } catch (error) {
        return error500(error);
    }
}

export async function getOrderById(orderId) {
    try {
        const order = await findOneOrderByCond({ _id: orderId });
        if (!order) return errorMessage(404, ERROR_CODE.ORDER_NOT_FOUND);
        return await getMetaDataOrder(order);
    } catch (error) {
        return error(error);
    }
}

export async function getMetaDataOrder(orders, type) {
    const isArray = Array.isArray(orders);
    if (!isArray) {
        orders = [orders];
    }
    const pointOrder = await getSettingDAO({ type: SETTING_TYPE.POINT_OVER_ORDER });

    orders = orders.map(async (o) => {
        o = o.toObject();
        // order Max
        if (o.vetic > pointOrder?.data?.value) {
            o.orderMax = true;
        } else o.orderMax = false;
        // ------------------
        if (type === TYPE_LOGIN.USER) {
            if (o.vetic * 10 > o.total * 3) {
                o.vetic = o.total * 3;
            } else {
                o.vetic *= 10;
            }
        }
        if (o?.userId) {
            const userInfo = await getUserInfo(o.userId);
            o.userId = (o.userId.toString() === userInfo._id.toString()) ? userInfo : {};
            o.userId.avatar = GetFileData(SHARE_HOST, JSON.parse(o.userId.avatar));
        }
        return o;
    });
    const promise = await Promise.all(orders);
    return isArray ? promise : promise[0];
}

export async function deleteOrderDraftBydId(orderId) {
    try {
        const order = await findOneOrderByCond({ _id: orderId, status: STATUS_ORDER.DRAFT });
        if (!order) return errorMessage(404, ERROR_CODE.ORDER_NOT_FOUND);
        return await order.remove();
    } catch (error) {
        return error500(error);
    }
}

export async function generateQR(text) {
    try {
        const result = await QRCode.toDataURL(text.toString(), {
            errorCorrectionLevel: 'H', version: 4, width: 500, margin: 1.5
        });
        return result;
    } catch (err) {
        return err;
    }
}

export async function veticReceive(data) {
    try {
        const special = parseInt(data.special);
        const typeSpecial = parseInt(data.typeSpecial);
        const total = parseInt(data.total);
        if (!Object.values(TYPE_SPECIAL).includes(typeSpecial)) return errorMessage(400, ERROR_CODE.TYPE_VETIC_INCORRECT);
        const settings = await Promise.all([getSettingGRPC(TYPE_SETTING.MULTIPLE_NUMBER_VETIC), getSettingGRPC(TYPE_SETTING.MAX_VETIC)]);
        if (typeSpecial === TYPE_SPECIAL.PERCENT) {
            if (special > (settings[1].value / 10)) {
                return successMessage(200, ERROR_CODE.PERCENT_VETIC_IS_NOT_GREATER_THAN_30, total * (settings[1].value / 100));
            }
            return successMessage(200, '', total * special / 10);
        }
        if (special > total) {
            return successMessage(200, ERROR_CODE.VETIC_IS_NOT_GREATER_THAN_TOTAL, total * (settings[1].value / 100));
        }
        if ((special * settings[0].value) > total * (settings[1].value / 100)) return successMessage(200, ERROR_CODE.VETIC_IS_NOT_GREATER_THAN_TOTAL, total * 3);
        return successMessage(200, '', special * settings[0].value);
    } catch (error) {
        return error500(error);
    }
}

export async function updateStatusOrder(orderId, status) {
    try {
        const order = await findOneOrderByCond({ _id: orderId });
        if (!order) return errorMessage(404, ERROR_CODE.ORDER_NOT_FOUND);
        if (order.status !== STATUS_ORDER.PENDING) return errorMessage(400, ERROR_CODE.ORDER_SAVED);
        if (status === STATUS_UPDATE_ORDER.ACCEPT) {
            order.status = STATUS_ORDER.DRAFT;
            await order.save();
            return order;
        }
        await order.remove();
        return true;
    } catch (error) {
        return error500(error);
    }
}

export async function paymentDraffOrder(options) {
    try {
        console.log('data payment draff order: ', options);
        const storeInfo = await getStoreInfo(options.storeId);
        if (!storeInfo._id) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        const order = await findOneOrderByCond({ _id: options.orderId });
        if (!order) return errorMessage(404, ERROR_CODE.ORDER_NOT_FOUND);
        if (order.status === STATUS_ORDER.MAIN) return errorMessage(400, ERROR_CODE.ORDER_WAS_PAYMENT);
        if (order.status === STATUS_ORDER.PENDING) return errorMessage(400, ERROR_CODE.ORDER_NOT_YET_SAVE);
        let walletValue = await getWallet(storeInfo._id, 'STORE');
        walletValue = JSON.parse(walletValue.wallet);
        if (parseInt(walletValue?.money) < order.vetic) {
            return errorMessage(404, ERROR_CODE.WALLET_NOT_ENOUGH_TO_PAY);
        }
        // over order point
        const pointOrder = await getSettingDAO({ type: SETTING_TYPE.POINT_OVER_ORDER });
        if (order.vetic > pointOrder?.data?.value) {
            console.log('over oder draft to waiting admin');
            order.status = STATUS_ORDER.WAITING_ADMIN;
            await order.save();
            return true;
        }
        // --------------------
        order.status = STATUS_ORDER.MAIN;
        let data = {
            orderId: order._id,
            total: order.total,
            vetic: order.vetic,
            userId: order.userId,
            sellId: order.ref_sell.id,
            buyId: order.ref_buy.id,
            storeId: storeInfo._id,
            storeUser: storeInfo.userId,
            invoice: order.invoice,
            typeOwner: TYPE_LOGIN.STORE,
            special: order.special
        };
        data = JSON.stringify(data);
        const dataReturn = await updateVeticFromOrder(data);
        // payment staff
        const staff = order?.staff?.id ? await getStaffInfo(order.staff.id) : null;
        if (staff?.paymentLimit) {
            if (staff.paymentLimit < order.total) return errorMessage(403, ERROR_CODE.NOT_ENOUGH_PAYMENT_LIMIT);
            await updatePaymentLimitFromOrder(staff.storeId, staff._id, order.vetic);
        }
        // ------------------
        if (dataReturn.success !== 'success') {
            order.status = STATUS_ORDER.DRAFT;
            await order.save();
            return order;
        }
        const promise = await Promise.all([order.save(), getReport({})]);
        await promise[1].update({
            $inc: { value: 1 }
        });
        console.log('response draff order: ', promise[1]);
        return promise[1];
    } catch (error) {
        console.log(error);
        return error500(error);
    }
}

export async function paymentDraffOrderNew(options) {
    try {
        const storeInfo = await getStoreInfo(options.storeId);
        if (!storeInfo._id) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        const order = await findOneOrderByCond({ _id: options.orderId });
        if (!order) return errorMessage(404, ERROR_CODE.ORDER_NOT_FOUND);
        if (order.status === STATUS_ORDER.MAIN) return errorMessage(400, ERROR_CODE.ORDER_WAS_PAYMENT);
        if (order.status === STATUS_ORDER.PENDING) return errorMessage(400, ERROR_CODE.ORDER_NOT_YET_SAVE);
        let walletValue = await getWallet(storeInfo._id, 'STORE');
        walletValue = JSON.parse(walletValue.wallet);
        // over order point
        let bankInfo = {};
        let payload = {};
        const pointOrder = await getSettingDAO({ type: SETTING_TYPE.POINT_OVER_ORDER });
        if (order.vetic > pointOrder?.data?.value) {
            console.log('over oder draft to waiting admin');
            order.status = STATUS_ORDER.WAITING_ADMIN;
            const bankInfoAdmin = await getSettingDAO({ type: SETTING_TYPE.BANK_INFO });
            bankInfo = {
                ...bankInfoAdmin.data,
                content: `${order.invoice}`
            };
            await order.save();
            const orderPayload = order.toJSON();
            orderPayload.bankInfo = bankInfo;
            payload = {
                order: orderPayload,
                orderMax: true
            };
            await notificationCreatePendingOrder(order._id, storeInfo._id, order.userId, order.invoice, order.total, order.special, order.vetic);
            return payload;
        }
        // --------------------
        // kiem tra vi tien shop
        if (parseInt(walletValue?.money) < order.vetic) {
            return errorMessage(404, ERROR_CODE.WALLET_NOT_ENOUGH_TO_PAY);
        }
        // payment staff
        const staff = order?.staff?.id ? await getStaffInfo(order.staff.id) : null;
        if (staff?.paymentLimit) {
            if (staff.paymentLimit < order.total) return errorMessage(403, ERROR_CODE.NOT_ENOUGH_PAYMENT_LIMIT);
            await updatePaymentLimitFromOrder(staff.storeId, staff._id, order.vetic);
        }
        // ------------------
        // order.status = STATUS_ORDER.MAIN;
        // let data = {
        //     orderId: order._id,
        //     total: order.total,
        //     vetic: order.vetic,
        //     userId: order.userId,
        //     sellId: order.ref_sell.id,
        //     buyId: order.ref_buy.id,
        //     storeId: storeInfo._id,
        //     storeUser: storeInfo.userId,
        //     invoice: order.invoice,
        //     typeOwner: TYPE_LOGIN.STORE,
        //     special: order.special,
        // };
        // data = JSON.stringify(data);
        // const dataReturn = await updateVeticFromOrder(data);
        // if (dataReturn.success !== 'success') {
        //     order.status = STATUS_ORDER.DRAFT;
        //     await order.save();
        //     return order;
        // }
        // const promise = await Promise.all([
        //     order.save(),
        //     getReport({})
        // ]);
        // await promise[1].update({
        //     $inc: { value: 1 }
        // });

        const orderPayload = order.toJSON();
        return {
            order: orderPayload,
            orderMax: false
        };
    } catch (error) {
        return error500(error);
    }
}

export async function handleTypePaymentDraffOrder(data, storeId, typePayment) {
    try {
        const storeInfo = await getStoreInfo(storeId);
        if (!storeInfo._id) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        const order = await findOneOrderByCond({ _id: data.orderId });
        if (!order) return errorMessage(404, ERROR_CODE.ORDER_NOT_FOUND);
        if (order.status === STATUS_ORDER.MAIN) return errorMessage(400, ERROR_CODE.ORDER_WAS_PAYMENT);
        if (order.status === STATUS_ORDER.PENDING) return errorMessage(400, ERROR_CODE.ORDER_NOT_YET_SAVE);
        if (order.status === STATUS_ORDER.WAITING_ADMIN) return errorMessage(400, ERROR_CODE.ORDER_WAITING_ADMIN_HANDLE);
        let walletValue = await getWallet(storeInfo._id, 'STORE');
        walletValue = JSON.parse(walletValue.wallet);
        // kiem tra type payment
        if (!typePayment || !Object.values(TYPE_PAYMENT_ORDER).includes(typePayment.toString())) {
            return errorMessage(400, ERROR_CODE.TYPE_PAYMENT_ORDER_INVALID);
        }
        // type e wallet
        if (typePayment.toString() === TYPE_PAYMENT_ORDER.E_WALLET) {
            // --------------------
            // kiem tra vi tien shop
            if (parseInt(walletValue?.money) < order.vetic) {
                return errorMessage(404, ERROR_CODE.WALLET_NOT_ENOUGH_TO_PAY);
            }
            // payment staff
            const staff = order?.staff?.id ? await getStaffInfo(order.staff.id) : null;
            if (staff?.paymentLimit) {
                if (staff.paymentLimit < order.total) return errorMessage(403, ERROR_CODE.NOT_ENOUGH_PAYMENT_LIMIT);
                await updatePaymentLimitFromOrder(staff.storeId, staff._id, order.vetic);
            }
            order.status = STATUS_ORDER.MAIN;
            let dataInitial = {
                orderId: order._id,
                total: order.total,
                vetic: order.vetic,
                userId: order.userId,
                sellId: order.ref_sell.id,
                buyId: order.ref_buy.id,
                storeId: storeInfo._id,
                storeUser: storeInfo.userId,
                invoice: order.invoice,
                typeOwner: TYPE_LOGIN.STORE,
                special: order.special,
            };
            dataInitial = JSON.stringify(dataInitial);
            const dataReturn = await updateVeticFromOrder(dataInitial);
            if (dataReturn.success !== 'success') {
                order.status = STATUS_ORDER.DRAFT;
                await order.save();
                return order;
            }
            const promise = await Promise.all([
                order.save(),
                getReport({})
            ]);
            await promise[1].update({
                $inc: { value: 1 }
            });
            return dataInitial;
        }
        // type vnpay
        if (typePayment.toString() === TYPE_PAYMENT_ORDER.VN_PAY) {
            // process
        }
        return true;
    } catch (error) {
        console.log('err handle payment draff order: ', error);
        return error500(error);
    }
}

export async function getOrderBuyer(id, query) {
    try {
        const sort = getSort(query);
        const user = await getUserInfo(id);
        if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const cond = {
            status: { $nin: [STATUS_ORDER.DRAFT, STATUS_ORDER.PENDING] },
            userId: id
        };
        if (query?.fromDay && query?.toDay) {
            cond.createdAt = {
                $gte: new Date(query.fromDay).toISOString(),
                $lte: new Date(query.toDay).toISOString()
            };
        }
        if (query?.type) {
            cond.type = query.type;
        }
        if (query?.status) {
            cond.status = parseInt(query.status, 10);
        }
        const promise = await Promise.all([findOrderByCond(cond, query, sort), countOrderByCond(cond)]);
        promise[0] = await getMetaDataOrder(promise[0], TYPE_LOGIN.USER);
        return [promise[1], promise[0]];
    } catch (error) {
        return error500(error);
    }
}

export async function getOrderBuyerById(id) {
    try {
        let payload = await findOneOrderByCond({ _id: id });
        payload = await getMetaDataOrder(payload);
        return payload;
    } catch (error) {
        return error500(error);
    }
}

export async function getBuyerOrder(id, query) {
    try {
        const sort = getSort(query);
        const orders = await uniqBuyer(id, query, sort);
        console.log(id);
        const buyerInfo = orders.map(async (order) => {
            if (order.vetic * 10 > order.total * 3) {
                order.vetic = order.total * 3;
            } else {
                order.vetic *= 10;
            }
            const user = await getUserInfo(order._id);
            if (user?.avatar) {
                user.avatar = GetFileData(SHARE_HOST, stringToJSON(user.avatar));
            }
            return user;
        });
        const promise = await Promise.all(buyerInfo);
        return [orders.length, promise];
    } catch (error) {
        return error500(error);
    }
}

export function stringToJSON(string) {
    return JSON.parse(string);
}

export async function getSalesListStaff(storeId, staffId, query) {
    try {
        const sort = getSort(query);
        const cond = {
            'store.id': storeId,
            'staff.id': staffId
        };
        if (query?.status) {
            cond.status = parseInt(query.status);
        }
        if (query?.fromDay && !query?.toDay) {
            cond.createdAt = { $gte: query.fromDay };
        }
        if (query?.toDay && !query?.fromDay) {
            cond.createdAt = { $lte: query.toDay };
        }
        if (query?.toDay && query?.fromDay) {
            cond.createdAt = { $lte: query.toDay, $gte: query.fromDay };
        }
        const promise = await Promise.all([countOrderByCond(cond), findOrderByCond(cond, query, sort)]);
        console.log('idStaff', cond, promise[1]);
        return [promise[0], promise[1]];
    } catch (error) {
        return error500(error);
    }
}
