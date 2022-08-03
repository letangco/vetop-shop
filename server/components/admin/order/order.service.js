/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-await */
import nodeXlsx from 'node-xlsx';
import { error500, errorMessage } from '../../../../external/util/error';
import logger from '../../../api/logger';
import { CURRENCY_TYPE, ERROR_CODE, PAYMENT_TYPE, SHARE_HOST, STAFF_STATUS, STATUS_ORDER, TYPE_LOGIN } from '../../../../external/constants/constants';
import OrderModel from '../../order/order.model';
import { getUserInfoByAdmin, getStoreInfoByAdmin, getStoreInfo } from '../../../../internal/grpc/user/request';
import categoryModel from '../../category/category.model';
import { GetFileData } from '../../../../external/util/file';
import { getSort } from '../../../../external/middleware/query';
import { countOrderByCond, findOneOrderByCond, findOrderByCond } from '../../order/order.dao';
import { createTransactionTopUp, updateVeticFromOrder } from '../../../../internal/grpc/wallet/request';
import { getReport } from '../../order/reportOrder.dao';
import { getMetaDataOrder } from '../../order/order.service';

// import { getSort } from '../../../external/middleware/query';

export async function getOrderInfoByAdminService(id) {
    try {
        const hasOrder = await OrderModel.findById(id);
        if (!hasOrder) return errorMessage(404, ERROR_CODE.ORDER_NOT_FOUND);
        const resultOrder = hasOrder.toObject();
        if (hasOrder.userId) {
            const hasUserId = await getUserInfoByAdmin(hasOrder.userId);
            if (hasUserId?._id) resultOrder.userId = hasUserId;
            else resultOrder.userId = {};
        }
        if (hasOrder.ref_buy) {
            const hasRefBuy = await getUserInfoByAdmin(hasOrder.ref_buy.id);
            if (hasRefBuy?._id) resultOrder.ref_buy = hasRefBuy;
            else resultOrder.ref_buy = {};
        }
        if (hasOrder.ref_sell) {
            const hasRefSell = await getUserInfoByAdmin(hasOrder.ref_sell.id);
            if (hasRefSell?._id) resultOrder.ref_sell = hasRefSell;
            else resultOrder.ref_sell = {};
        }
        if (hasOrder.staff) {
            const hasStaff = await getUserInfoByAdmin(hasOrder.staff.id);
            if (hasStaff?._id) resultOrder.staff = hasStaff;
            else resultOrder.staff = {};
        }
        if (hasOrder.store) {
            const hasStore = await getStoreInfoByAdmin(hasOrder.store.id);
            if (hasStore?._id) {
                const arrCate = hasStore.storeCategories;
                if (!arrCate.length) resultOrder.store = hasStore;
                else {
                    const payloadCate = arrCate.map(async (item) => {
                        let hasCate = await categoryModel.findById(item);
                        if (!hasCate) return null;
                        hasCate = hasCate.toObject();
                        hasCate.image = GetFileData(SHARE_HOST, hasCate.image);
                        hasCate.icon = GetFileData(SHARE_HOST, hasCate.icon);
                        return hasCate;
                    });
                    const promiseCate = (await Promise.all(payloadCate)).filter(item => item);
                    resultOrder.store = hasStore;
                    resultOrder.store.storeCategories = promiseCate;
                }
            } else resultOrder.store = {};
        }
        return resultOrder;
    } catch (error) {
        logger.error(error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getListOrderByAdminService(options) {
    try {
        const conditions = {};
        switch (options.status) {
            case STATUS_ORDER.MAIN.toString():
                conditions.status = STATUS_ORDER.MAIN;
                break;
            case STATUS_ORDER.DRAFT.toString():
                conditions.status = STATUS_ORDER.DRAFT;
                break;
            case undefined:
            case '':
                conditions.status = { $in: [STATUS_ORDER.MAIN, STATUS_ORDER.DRAFT] };
                break;
            default:
                return errorMessage(406, ERROR_CODE.STATUS_INVALID);
        }
        const fromDay = options.fromDay ? new Date(options.fromDay).toISOString() : null;
        const toDay = options.toDay ? new Date(options.toDay).toISOString() : null;
        if (fromDay && !toDay) {
            conditions.createdAt = {
                $gte: fromDay,
            };
        }
        if (!fromDay && toDay) {
            conditions.createdAt = {
                $lt: toDay,
            };
        }
        if (fromDay && toDay) {
            conditions.createdAt = {
                $gte: fromDay,
                $lt: toDay
            };
        }
        const { keyword } = options;
        if (keyword) {
            conditions['$or'] = [
                { invoice: { $regex: keyword } },
                { searchString: { $regex: keyword, $options: 'i' } }
            ];
        }
        const promiseOrder = await Promise.all([
            OrderModel.countDocuments(conditions),
            OrderModel.find(conditions).sort({ createdAt: -1 }).limit(options.limit).skip(options.skip)
        ]);
        const mapInfoOrder = promiseOrder[1].map(async item => await getOrderInfoByAdminService(item._id));
        return [promiseOrder[0], await Promise.all(mapInfoOrder)];
    } catch (error) {
        logger.error(error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

function insertItemAtPositionK(arr, n, k, x) {
    for (let i = n; i >= k; i--) {
        arr[i] = arr[i - 1];
    }
    arr[k] = x;
    n++;
    return arr;
}

export async function exportOrderExcelByAdmin(options) {
    try {
        const conditions = {};
        switch (options.status) {
            case STATUS_ORDER.MAIN.toString():
                conditions.status = STATUS_ORDER.MAIN;
                break;
            case STATUS_ORDER.DRAFT.toString():
                conditions.status = STATUS_ORDER.DRAFT;
                break;
            case undefined:
            case '':
                conditions.status = { $in: [STATUS_ORDER.MAIN, STATUS_ORDER.DRAFT] };
                break;
            default:
                return errorMessage(406, ERROR_CODE.STATUS_INVALID);
        }
        const fromDay = options.fromDay ? new Date(options.fromDay).toISOString() : null;
        const toDay = options.toDay ? new Date(options.toDay).toISOString() : null;
        if (fromDay && !toDay) {
            conditions.createdAt = {
                $gte: fromDay,
            };
        }
        if (!fromDay && toDay) {
            conditions.createdAt = {
                $lt: toDay,
            };
        }
        if (fromDay && toDay) {
            conditions.createdAt = {
                $gte: fromDay,
                $lt: toDay
            };
        }
        const { keyword } = options;
        if (keyword) {
            conditions['$or'] = [
                { invoice: { $regex: keyword } },
                { description: { $regex: keyword, $options: 'i' } },
            ];
        }
        const dataExcel = [];
        const order = await OrderModel.find(conditions);
        const mapInfoOrder = order.map(async (item) => {
            const hasOrder = await OrderModel.findById(item._id);
            if (!hasOrder) return null;
            item = item.toObject();
            if (hasOrder.userId) {
                const hasUserId = await getUserInfoByAdmin(hasOrder.userId);
                hasUserId?._id ? item.userId = hasUserId.code : item.userId = '';
            }
            if (hasOrder.ref_buy) {
                const hasRefBuy = await getUserInfoByAdmin(hasOrder.ref_buy.id);
                hasRefBuy?._id ? item.ref_buy = hasRefBuy.code : item.ref_buy = '';
            }
            if (hasOrder.ref_sell) {
                const hasRefSell = await getUserInfoByAdmin(hasOrder.ref_sell.id);
                hasRefSell?._id ? item.ref_sell = hasRefSell.code : item.ref_sell = '';
            }
            if (hasOrder.staff) {
                const hasStaff = await getUserInfoByAdmin(hasOrder.staff.id);
                hasStaff?._id ? item.staff = hasStaff.code : item.staff = '';
            }
            if (hasOrder.store) {
                const hasStore = await getStoreInfoByAdmin(hasOrder.store.id);
                hasStore?._id ? item.store = hasStore._id : item.store = '';
            }
            if (hasOrder.status) {
                hasOrder.status === 1 ? item.status = 'ONLINE' : item.status = 'OFFLINE';
            }
            return item;
        });
        // data
        const payload = await Promise.all(mapInfoOrder);
        const arr = await OrderModel.aggregate([
            {
                $project: {
                    data: {
                        $objectToArray: '$$ROOT'
                    }
                }
            },
            {
                $project: {
                    data: '$data.k'
                }
            },
            {
                $unwind: '$data'
            },
            {
                $group: {
                    _id: null,
                    keys: {
                        $addToSet: '$data'
                    }
                }
            }
        ]);
        const arrHeader = arr[0].keys;
        dataExcel.push(arrHeader);
        const header = [...new Set(arrHeader)];
        for (const item of payload) {
            const data = [];
            const keyUser = Object.keys(item);
            for (let i = 0; i < header.length; i++) {
                for (let j = 0; j < keyUser.length; j++) {
                    if (header[i] === keyUser[j]) {
                        insertItemAtPositionK(data, data.length, i, item[keyUser[j]]);
                        break;
                    }
                }
            }
            dataExcel.push(data);
        }
        const buffer = nodeXlsx.build([{ name: 'Sheet1', data: dataExcel }]);
        return ['orders.xlsx', buffer];
    } catch (error) {
        logger.error(error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getOrderWaitingConfirm(query) {
    try {
        if (!Object.values(STAFF_STATUS).includes(parseInt(query.status))) return errorMessage(403, ERROR_CODE.STATUS_INVALID)
        const sort = getSort(query);
        const conditions = {
            status: parseInt(query.status)
        };
        const fromDay = query.fromDay ? new Date(query.fromDay).toISOString() : null;
        const toDay = query.toDay ? new Date(query.toDay).toISOString() : null;
        if (fromDay && !toDay) {
            conditions.createdAt = {
                $gte: fromDay,
            };
        }
        if (!fromDay && toDay) {
            conditions.createdAt = {
                $lt: toDay,
            };
        }
        if (fromDay && toDay) {
            conditions.createdAt = {
                $gte: fromDay,
                $lt: toDay
            };
        }
        const { keyword } = query;
        if (keyword) {
            conditions['$or'] = [
                { invoice: { $regex: keyword } },
            ];
        }
        const promise = await Promise.all([countOrderByCond(conditions), findOrderByCond(conditions, query, sort)]);
        const data = await getMetaDataOrder(promise[1]);
        return [promise[0], data];
    } catch (error) {
        return error500(error);
    }
}

export async function handleOrder(body, auth) {
    try {
        const order = await findOneOrderByCond({ _id: body.orderId });
        if (!order) return errorMessage(404, ERROR_CODE.ORDER_NOT_FOUND);
        if (!Object.values(STATUS_ORDER).includes(parseInt(body.status))) return errorMessage(403, ERROR_CODE.STATUS_INVALID);
        order.status = parseInt(body.status);
        if (order.status === STATUS_ORDER.MAIN) {
            const ownerStore = await getStoreInfo(order.store.id);
            if (!ownerStore) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
            await createTransactionTopUp(ownerStore._id, auth._id, order.vetic, CURRENCY_TYPE.VND, PAYMENT_TYPE.TOPUP);
            // let orderOptions = {
            //     orderId: order._id,
            //     total: order.total,
            //     vetic: order.vetic,
            //     userId: order.userId,
            //     sellId: order.ref_sell.id,
            //     buyId: order.ref_buy.id,
            //     storeId: order.store.id,
            //     storeUser: ownerStore.userId,
            //     invoice: order.invoice,
            //     typeOwner: TYPE_LOGIN.STORE,
            //     special: order.special
            // };
            // orderOptions = JSON.stringify(orderOptions);
            // await updateVeticFromOrder(orderOptions);
            const report = await getReport({});
            await order.save();
            await report.update({
                $inc: { value: 1 }
            });
            return order;
        }
        await order.save();
        return true;
    } catch (error) {
        return error500(error);
    }
}
