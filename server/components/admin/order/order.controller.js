import * as orderService from './order.service';
import { commonGetQuery } from '../../../../external/middleware/query';

export async function getOrderInfoByAdmin(req, res) {
    try {
        const { id } = req.params;
        const payload = await orderService.getOrderInfoByAdminService(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListOrderByAdmin(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await orderService.getListOrderByAdminService(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function exportOrderExcelByAdmin(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await orderService.exportOrderExcelByAdmin(query);
        res.setHeader('Content-Disposition', `attachment; filename=${payload[0]}`);
        return res.send(payload[1]);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getOrderWaitingConfirm(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await orderService.getOrderWaitingConfirm(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function handleOrder(req, res) {
    try {
        const { body } = req;
        const { user } = req;
        const payload = await orderService.handleOrder(body, user);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
