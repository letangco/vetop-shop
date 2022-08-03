import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import PaymentListOrder from './paymentListOrder.model';

export async function createTypePaymentOrder(option) {
    try {
        return await PaymentListOrder.create(option);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findTypePaymentOrderCondition(cond, query, sort) {
    try {
        return await PaymentListOrder
        .find(cond)
        .select({ __v: 0 })
        .sort(sort)
        .skip(query.skip)
        .limit(query.limit);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countTypePaymentOrderCondition(cond) {
    try {
        return await PaymentListOrder.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneTypePaymentOrderCondition(cond) {
    try {
        return await PaymentListOrder.findOne(cond).select({ __v: 0 });
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateOneTypePaymentOrderCondition(cond) {
    try {
        await PaymentListOrder.updateOne(cond);
        return true;
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findAllTypePaymentOrderByCond(cond, sort) {
    try {
        return await PaymentListOrder.find(cond).select({ __v: 0 }).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
