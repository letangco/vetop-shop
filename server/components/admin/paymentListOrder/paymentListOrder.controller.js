import { commonGetQuery } from '../../../../external/middleware/query';
import * as PaymentOrderService from './paymentListOrder.service';

export async function createPaymentOrder(req, res) {
    try {
        const { body } = req;
        const payload = await PaymentOrderService.createPaymentOrder(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListTypePaymentOrder(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await PaymentOrderService.getListTypePaymentOrder(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteTypePaymentOrder(req, res) {
    try {
        const { id } = req.params;
        return res.RH.success(await PaymentOrderService.deleteTypePaymentOrder(id));
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateTypePaymentOrder(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        return res.RH.success(await PaymentOrderService.updateTypePaymentOrder(id, body));
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateStatusPaymentOrder(req, res) {
    try {
        const { id, status } = req.params;
        return res.RH.success(await PaymentOrderService.updateStatusPaymentOrder(id, status));
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getDetailTypePaymentOrder(req, res) {
    try {
        const { id } = req.params;
        return res.RH.success(await PaymentOrderService.getDetailTypePaymentOrder(id));
    } catch (error) {
        return res.RH.error(error);
    }
}
