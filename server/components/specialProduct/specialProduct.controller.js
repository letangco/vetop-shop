import * as SpecialProductService from './specialProduct.service';
import { commonGetQuery } from '../../../external/middleware/query';

export async function getListSpecialProduct(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await SpecialProductService.getListSpecialProduct(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSpecialProductById(req, res) {
    try {
        const { id } = req.params;
        const payload = await SpecialProductService.getSpecialProductById(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
