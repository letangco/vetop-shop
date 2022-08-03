import { ERROR_CODE, TYPE_ORDER_SIM_PRODUCT } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import { toObjectIdFromId } from '../../helpers/help.helper';
import Order from './order.model';

export async function createOrderDAO(options) {
    try {
        return await Order.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneOrderByCond(cond) {
    try {
        return await Order.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOrderByCond(cond, query, sort) {
    try {
        return await Order.find(cond).sort(sort).skip(query.skip).limit(query.limit);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countOrderByCond(cond) {
    try {
        return await Order.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function uniqBuyer(id, query, sort) {
    try {
        return await Order.aggregate([
            { $match: { 'store.id': toObjectIdFromId(id) } },
            { $group: { _id: '$userId' } },
            { $skip: query.skip },
            { $limit: query.limit },
            { $sort: sort },
         ]);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getSalesDAO(staffId) {
    try {
        const result = await Order.aggregate([
            { $match: { 'staff.id': toObjectIdFromId(staffId) } },
            { $group: { _id: null, staffId: { $first: '$staff.id' }, total: { $sum: '$total' }, count: { $sum: 1 } } }
        ]);
        return result[0].total;
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateOrderByCondDao(orderId, status) {
    try {
        const order = await Order.findOne({ _id: orderId });
        if (!order) return false;
        await order.updateOne({
            $set: { status: parseInt(status) }
        });
        return true;
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
