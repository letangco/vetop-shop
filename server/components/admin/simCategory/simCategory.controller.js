import { commonGetQuery } from '../../../../external/middleware/query';
import * as SimCategoryService from './simCategory.service';

export async function addSimCategory(req, res) {
    try {
        const { user } = req;
        const { body } = req;
        const payload = await SimCategoryService.addSimCategory(body, user);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSimCategories(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await SimCategoryService.getSimCategories(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateSimCategory(req, res) {
    try {
        const { user } = req;
        const { body } = req;
        const payload = await SimCategoryService.updateSimCategory(user, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
