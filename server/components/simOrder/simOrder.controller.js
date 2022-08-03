import { commonGetQuery } from '../../../external/middleware/query';
import * as SimOrderService from './simOrder.service';

export async function createOrder(req, res) {
    try {
        const { body } = req;
        const { user } = req;
        const payload = await SimOrderService.createSimOrder(body, user);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getOrders(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await SimOrderService.getOrders(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getOrder(req, res) {
    try {
        const { id } = req.params;
        const payload = await SimOrderService.getOrder(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateSimFromOrder(req, res) {
    try {
        const { user } = req;
        const { body } = req;
        const payload = await SimOrderService.updateSimFromOrder(user, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
