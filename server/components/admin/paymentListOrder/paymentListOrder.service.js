import slug from 'slug';
import { error500, errorMessage } from '../../../../external/util/error';
import logger from '../../../api/logger';
import { GetFileData, updateLinkImageByAdmin } from '../../../../external/util/file';
import { createTypePaymentOrder, findTypePaymentOrderCondition, countTypePaymentOrderCondition, findOneTypePaymentOrderCondition } from '../../paymentListOrder/paymentListOrder.dao';
import { DEFAULT_AVATAR_STORE, ERROR_CODE, SHARE_HOST } from '../../../../external/constants/constants';

export async function createPaymentOrder(data) {
    try {
        data.image = data?.image ? updateLinkImageByAdmin(data.image, SHARE_HOST) : DEFAULT_AVATAR_STORE;
        return await createTypePaymentOrder(data);
    } catch (error) {
        console.log('create payment order: ', error);
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getListTypePaymentOrder(options) {
    try {
        const conditions = {};
        if (options?.keyword) {
            conditions.$or = [
                {
                    name: { $regex: slug(options.keyword, ' '), $options: 'i' }
                },
                {
                    searchString: { $regex: slug(options.keyword, ' '), $options: 'i' }
                }
            ];
        }
        const promise = await Promise.all([
            findTypePaymentOrderCondition(conditions, options, { createdAt: -1 }),
            countTypePaymentOrderCondition(conditions)
        ]);
        const payload = promise[0].map((item) => {
            item = item.toJSON();
            item.image = item?.image ? GetFileData(SHARE_HOST, item.image) : GetFileData(SHARE_HOST, DEFAULT_AVATAR_STORE);
            return item;
        });
        return [promise[1], payload];
    } catch (error) {
        console.log('get list payment order: ', error);
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteTypePaymentOrder(id) {
    try {
        const payment = await findOneTypePaymentOrderCondition({ _id: id });
        if (!payment) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        await payment.remove();
        return true;
    } catch (error) {
        console.log('delete type payment order: ', error);
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateTypePaymentOrder(id, data) {
    try {
        const payment = await findOneTypePaymentOrderCondition({ _id: id });
        if (!payment) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        if (data?.name && data?.name !== payment.name) {
            data.searchString = slug(`${data.name}`, ' ');
        }
        data.image = data?.image ? updateLinkImageByAdmin(data.image, SHARE_HOST) : DEFAULT_AVATAR_STORE;
        Object.keys(data)
            .forEach((key) => {
                payment[key] = data[key];
            });
        await payment.save();
        return true;
    } catch (error) {
        console.log('update type payment order: ', error);
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateStatusPaymentOrder(id, status) {
    try {
        const payment = await findOneTypePaymentOrderCondition({ _id: id });
        if (!payment) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        const valStatus = ['true', 'false'];
        if (!valStatus.includes(status.toString())) {
            return errorMessage(400, ERROR_CODE.STATUS_INVALID);
        }
        await payment.updateOne({
            $set: {
                status: status.toString() === 'true'
            }
        });
        return true;
    } catch (error) {
        console.log('update status type payment order: ', error);
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getDetailTypePaymentOrder(id) {
    try {
        let payment = await findOneTypePaymentOrderCondition({ _id: id });
        if (!payment) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        payment = payment.toJSON();
        payment.image = payment?.image ? GetFileData(SHARE_HOST, payment.image) : GetFileData(SHARE_HOST, DEFAULT_AVATAR_STORE);
        return payment;
    } catch (error) {
        console.log('get detail type payment order: ', error);
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
