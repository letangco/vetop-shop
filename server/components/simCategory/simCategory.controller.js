import { commonGetQuery } from '../../../external/middleware/query';
import * as SimCategoryService from './simCategory.service';

export async function getSimCategory(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await SimCategoryService.getSimCategory(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSettingsFilter(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await SimCategoryService.getSettingsFilter(query);
        return res.RH.paging(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSettingFilter(req, res) {
    try {
        const { type } = req.query;
        const payload = await SimCategoryService.getSettingFilter(type);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSimCategoryById(req, res) {
    try {
        const { id } = req.params;
        const query = commonGetQuery(req);
        const payload = await SimCategoryService.SimCategoryService(id, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}
