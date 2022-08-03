import * as ProductService from './product.service';
import { commonGetQuery } from '../../../../external/middleware/query';

export async function getListProductByAdmin(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await ProductService.getListProduct(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getInfoProductByAdmin(req, res) {
    try {
        const { id } = req.params;
        const payload = await ProductService.getInfoProductService(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateStatusProductByAdmin(req, res) {
    try {
        const { id, status } = req.params;
        const payload = await ProductService.updateStatusProductService(id, status);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteProductByAdmin(req, res) {
    try {
        const { id } = req.params;
        const payload = await ProductService.deleteProductByIdService(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function formatProductByAdmin(req, res) {
    try {
        return res.RH.success(await ProductService.formatProductByAdmin());
    } catch (error) {
        return res.RH.error(error);
    }
}
