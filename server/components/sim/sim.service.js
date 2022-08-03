import { error500, errorMessage } from "../../../external/util/error";
import { createSimDAO, getSimDAO, getSimsDAO, getTotalSim } from './sim.dao';
import { redisGet } from '../../util/Redis';
import { CURRENCY_TYPE, ERROR_CODE, PAYMENT_TYPE, SHARE_HOST, STATUS_SELL_SIM, TYPE_FILTER_SIM, TYPE_LOGIN, TYPE_PAID_SIM, TYPE_SIM_CATEGORY, USER_TYPE, WALLET_TYPE } from "../../../external/constants/constants";
import { getSimCategoriesDAO, getSimCategoriesUnlimitDAO, getSimCategoryDAO } from "../simCategory/simCategory.dao";
import { getSort } from "../../../external/middleware/query";
import { getStoreInfo, getUserInfo } from "../../../internal/grpc/user/request";
import { GetFileData } from "../../../external/util/file";
import { createTransactionSimMall, createWalletSim, getWallet } from "../../../internal/grpc/wallet/request";
import { getMetaDataSimCategory } from "../admin/simCategory/simCategory.service";
import { createSiMallAccDAO, getSimMallAccDAO } from "../simMallAccount/simMallAccount.dao";
import { getCategories } from "../category/category.service";
import { getTotalRatingSimDAO } from "../ratingSimMall/ratingSimMall.dao";

export async function addSim(data, auth) {
    try {
        let simAccount = await getSimMallAccDAO({ user: auth?.storeId ? auth.storeId : auth._id });
        if (!simAccount) {
            let profile;
            if (auth?.storeId) {
                profile = await getStoreInfo(auth.storeId);
            } else {
                profile = await getUserInfo(auth._id);
            }
            simAccount = await createSiMallAccDAO({
                user: profile._id,
                phone: profile.phone,
                name: auth?.storeId ? profile.name : profile.fullName
            });
        }
        const checkSim = await getSimDAO({ sim: data.sim, status: { $nin: [STATUS_SELL_SIM.SOLD] } });
        if (checkSim) return errorMessage(403, ERROR_CODE.SIM_EXISTS);
        // const checked = await redisGet(data.sim);
        // if (checked?.toString() !== data?.code.toString()) return errorMessage(403, ERROR_CODE.CODE_NOT_FOUND);
        data.categories = Array.isArray(data.categories) ? data.categories : [data.categories];
        const hasCategories = await getSimCategoriesUnlimitDAO({ _id: { $in: data.categories } });
        if (hasCategories.length !== data.categories.length) return errorMessage(404, ERROR_CODE.CATEGORY_NOT_FOUND);
        const wallet = await getWallet(auth._id, auth.storeId ? 'STORE' : 'USER');
        if (!wallet) return errorMessage(403, ERROR_CODE.WALLET_NOT_FOUND);
        wallet.wallet = JSON.parse(wallet.wallet);
        if (wallet.wallet.vetic < data.vetic) return errorMessage(403, ERROR_CODE.VETIC_NOT_ENOUGH);
        const network = await getSimCategoryDAO({ _id: data.network, type: TYPE_SIM_CATEGORY.NETWORK, parent: { $exists: true } });
        if (!network) return errorMessage(404, ERROR_CODE.NETWORK_NOT_FOUND);
        if (!Object.values(TYPE_PAID_SIM).includes(data.typeSim)) return errorMessage(404, ERROR_CODE.TYPE_PAID_SIM_NOT_FOUND)
        data.owner = simAccount._id;
        data.typeOwner = auth?.storeId ? TYPE_LOGIN.STORE : TYPE_LOGIN.USER;
        const newSim = await createSimDAO(data);
        await Promise.all([
            createWalletSim(newSim._id, 'SIM', data.vetic, newSim.sim),
            createTransactionSimMall(simAccount._id, PAYMENT_TYPE.TRANSFER_VETIC_TO_SIM, data.vetic, newSim._id, auth?.storeId ? USER_TYPE.STORE : USER_TYPE.USER, CURRENCY_TYPE.VETIC)
        ]);
        return newSim;
    } catch (error) {
        return error500(error);
    }
}

export async function getSim(query) {
    try {
        const sort = getSort(query);
        const options = {
            status: { $nin: [STATUS_SELL_SIM.SOLD] }
        };
        if (query?.categories) {
            const cateList = query.categories.split(',');
            options.categories = { $in: cateList };
        }
        if (query?.filterVetic) {
            const filterVetic = query.filterVetic.split(',');
            if (filterVetic.length > 1) {
                options.vetic = { $gte: parseInt(filterVetic[0]), $lte: parseInt(filterVetic[1]) };
            }
        }
        if (query?.filterPrice) {
            const filterPrice = query.filterPrice.split(',');
            if (filterPrice.length > 1) {
                options.price = { $gte: parseInt(filterPrice[0]), $lte: parseInt(filterPrice[1]) };
            }
        }
        const promise = await Promise.all([getTotalSim(options), getSimsDAO(options, query, sort)]);
        if (promise[0]) {
            return [promise[0], await getMetaDataSim(promise[1])];
        }
        return [0, []];
    } catch (error) {
        return error500(error);
    }
}

export async function getMetaDataSim(data) {
    try {
        const isArray = Array.isArray(data);
        if (!isArray) {
            data = [data];
        }
        const promise = data.map(async (item) => {
            item = item.toObject();
            item.owner = await getSimMallAccDAO({ _id: item.owner });
            if (item?.owner?.avatar) {
                item.owner.avatar = GetFileData(SHARE_HOST, item.owner.avatar);
            }
            const listCategories = item.categories.map(async (cate, i) => {
                const category = await getSimCategoryDAO({ _id: item.categories[i] });
                if (category?.image) {
                    category.image = GetFileData(SHARE_HOST, category.image);
                }
                return category;
            });
            item.network = await getSimCategoryDAO({ _id: item.network }) || '';
            item.categories = await Promise.all(listCategories) || '';
            item.totalComment = await getTotalRatingSimDAO({ owner: item.owner });
            item.totalVetic = item.vetic + (item.special * item.price / 10);
            return item;
        });
        const result = await Promise.all(promise);
        return isArray ? result : result[0];
    } catch (error) {
        return error500(error);
    }
}

export async function changeStatusSim(body, user) {
    try {
        const sim = await getSimDAO({ _id: body.simId });
        if (!sim) return errorMessage(404, ERROR_CODE.SIM_NOT_FOUND);
        const owner = await getSimMallAccDAO({ _id: sim.owner });
        if (!owner) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        if (owner.user.toString() !== user._id) return errorMessage(404, ERROR_CODE.SIM_NOT_FOUND);
        if (!Object.values(STATUS_SELL_SIM).includes(body.status)) return errorMessage(404, ERROR_CODE.STATUS_INVALID);
        if (body.categories) {
            const isArray = Array.isArray(body.categories);
            if (!isArray) {
                body.categories = [body.categories];
            }
            const categories = await getSimCategoriesDAO({ _id: { $in: body.categories } });
            if (categories.length !== body.categories) return errorMessage(400, ERROR_CODE.CATEGORY_NOT_FOUND);
        }
        if (body?.typeSim) {
            if (!Object.values(TYPE_PAID_SIM).includes(parseInt(body.typeSim))) {
                return errorMessage(404, ERROR_CODE.TYPE_PAID_SIM_NOT_FOUND);
            }
        }
        sim.typeSim = body.typeSim || sim.typeSim;
        sim.status = body.status;
        sim.description = body.description || sim.description;
        sim.price = body.price || sim.price;
        sim.categories = body.categories || sim.categories;
        sim.vetic = body.vetic || sim.vetic;
        await sim.save();
        return sim;
    } catch (error) {
        return error500(error);
    }
}

export async function removeSim(id, user) {
    try {
        const sim = await getSimDAO({ _id: id });
        if (!sim) return errorMessage(404, ERROR_CODE.SIM_NOT_FOUND);
        const owner = await getSimMallAccDAO({ _id: sim.owner });
        let userId = user._id;
        if (user?.storeId) {
            userId = user.storeId;
        }
        if (owner.user.toString() !== userId.toString()) return errorMessage(404, ERROR_CODE.SIM_NOT_FOUND);
        await sim.remove();
        return true;
    } catch (error) {
        return error500(error);
    }
}

export async function getDetailSim(id) {
    try {
        const sim = await getSimDAO({ _id: id });
        return await getMetaDataSimCategory(sim);
    } catch (error) {
        return error500(error);
    }
}


export async function getHistorySim(query, sim) {
    try {
        const sort = getSort(query);
        const promise = await Promise.all([getTotalSim({ sim }), getSimsDAO({ sim }, query, sort)]);
        if (promise[0]) {
            promise[1] = await getMetaDataSim(promise[1]);
        }
        return [promise[0], promise[1]];
    } catch (error) {
        return error500(error);
    }
}

export async function getSimOwner(user, query) {
    try {
        const sort = getSort(query);
        const simAccount = await getSimMallAccDAO({ user: user._id });
        const options = {
            status: { $nin: [STATUS_SELL_SIM.SOLD] },
            owner: simAccount._id
        };
        if (query?.categories) {
            const cateList = query.categories.split(',');
            options.categories = { $in: cateList };
        }
        if (!simAccount) return errorMessage(404, ERROR_CODE.SIM_MALL_ACCOUNT_NOTFOUND);
        const promise = await Promise.all([getTotalSim(options), getSimsDAO(options, query, sort)]);
        if (promise[0]) {
            return [promise[0], await getMetaDataSim(promise[1])];
        }
        return [0, []];
    } catch (error) {
        return error500(error);
    }
}
