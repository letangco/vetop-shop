import { ORDER_TYPE, STATUS_ORDER } from '../../../external/constants/constants';
import { commonGetQuery } from '../../../external/middleware/query';
import * as OrderService from './order.service';

export async function createOrder(req, res) {
    try {
        const {
            body
        } = req;
        const { user } = req;
        const payload = await OrderService.createOrderNew(user, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getOrders(req, res) {
    try {
        const query = commonGetQuery(req);
        const storeId = req.user.storeId;
        const payload = await OrderService.getOrders(storeId, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getOrdersById(req, res) {
    try {
        const orderId = req.params.id;
        const payload = await OrderService.getOrderById(orderId);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getStatusOrder(req, res) {
    try {
        return res.RH.success(STATUS_ORDER)
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getTypeOrder(req, res) {
    try {
        return res.RH.success(ORDER_TYPE)
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteOrderDraftBydId(req, res) {
    try {
        const orderId = req.params.id;
        const payload = await OrderService.deleteOrderDraftBydId(orderId);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getVeticReceive(req, res) {
    try {
        const body = {
            special: req.query.special,
            typeSpecial: req.query.typeSpecial,
            total: req.query.total
        }
        const payload = await OrderService.veticReceive(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateStatusOrder(req, res) {
    try {
        const { orderId, status } = req.body;
        const payload = await OrderService.updateStatusOrder(orderId, status);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function paymentDraffOrder(req, res) {
    try {
        const options = {
            orderId: req?.body?.orderId,
            storeId: req?.user?.storeId
        };
        const payload = await OrderService.paymentDraffOrderNew(options);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function handleTypePaymentDraffOrder(req, res) {
    try {
        const storeId = req?.user?.storeId;
        const { order, typePayment } = req?.body;
        const payload = await OrderService.handleTypePaymentDraffOrder(order, storeId, typePayment);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getOrderBuyer(req, res) {
    try {
        const id = req.user._id;
        const query = commonGetQuery(req);
        const payload = await OrderService.getOrderBuyer(id, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getOrderBuyerById(req, res) {
    try {
        const { id } = req.params;
        const payload = await OrderService.getOrderBuyerById(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getBuyerOrder(req, res) {
    try {
        const query = commonGetQuery(req);
        const id = req.user.storeId;
        const payload = await OrderService.getBuyerOrder(id, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSalesListStaff(req, res) {
    try {
        const query = commonGetQuery(req);
        const { staffId } = req.params;
        const { storeId } = req.user;
        const payload = await OrderService.getSalesListStaff(storeId, staffId, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}
