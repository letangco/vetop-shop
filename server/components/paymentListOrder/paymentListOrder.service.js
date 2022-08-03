import { DEFAULT_AVATAR_STORE, ERROR_CODE, SHARE_HOST } from '../../../external/constants/constants';
import { error500, errorMessage } from '../../../external/util/error';
import { GetFileData } from '../../../external/util/file';
import logger from '../../api/logger';
import { findAllTypePaymentOrderByCond, findOneTypePaymentOrderCondition } from './paymentListOrder.dao';

export async function getListTypePaymentOrder() {
    try {
        const promise = await Promise.all([
            findAllTypePaymentOrderByCond({ status: true }, { createdAt: -1 }),
        ]);
        const payload = promise[0].map((item) => {
            item = item.toJSON();
            item.image = item?.image ? GetFileData(SHARE_HOST, item.image) : GetFileData(SHARE_HOST, DEFAULT_AVATAR_STORE);
            return item;
        });
        return payload;
    } catch (error) {
        console.log('err get list type payment order: ', error);
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getDetailTypePaymentOrder(id) {
    try {
        let payment = await findOneTypePaymentOrderCondition({ _id: id });
        if (!payment) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        if (!payment.status) return errorMessage(401, ERROR_CODE.UNAUTHORIZED);
        payment = payment.toJSON();
        payment.image = payment?.image ? GetFileData(SHARE_HOST, payment.image) : GetFileData(SHARE_HOST, DEFAULT_AVATAR_STORE);
        return payment;
    } catch (error) {
        console.log('get detail type payment order: ', error);
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

