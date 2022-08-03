import * as SpecialProductService from './specialProduct.service';
import { commonGetQuery } from '../../../../external/middleware/query';

export async function createSpecialProductByAdmin(req, res) {
    try {
        const { body } = req;
        const payload = await SpecialProductService.createSpecialProductByAdmin(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListSpecialProductByAdmin(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await SpecialProductService.getListSpecialProductByAdmin(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
     return res.RH.error(error);
    }
}

export async function getInfoSpecialProductByAdmin(req, res) {
    try {
        const { id } = req.params;
        const payload = await SpecialProductService.getInfoSpecialProductByAdmin(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteSpecialProductByAdmin(req, res) {
    try {
        const { productId } = req.params;
        const payload = await SpecialProductService.deleteSpecialProductByAdmin(productId);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function sortSpecialProductByAdmin(req, res) {
    try {
        const { productId } = req.params;
        const { index } = req.query;
        const payload = await SpecialProductService.sortSpecialProductByAdmin(productId, index);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

