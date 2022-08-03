import { commonGetQuery } from '../../../../external/middleware/query';
import * as CategoryService from './category.service';

export async function adminGetCategory(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await CategoryService.adminGetCategory(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function adminGetCategoryById(req, res) {
    try {
        const { id } = req.params;
        const query = commonGetQuery(req);
        const payload = await CategoryService.adminGetCategoryById(id, query);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function adminCreateCategory(req, res) {
    try {
        const { body } = req;
        const auth = req?.user;
        const payload = await CategoryService.adminCreateCategory(body, auth);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function adminUpdateCategory(req, res) {
    try {
        const { body } = req;
        const { id } = req.params;
        const payload = await CategoryService.adminUpdateCategory(id, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function adminDeleteCategory(req, res) {
    try {
        const { id } = req.params;
        const payload = await CategoryService.adminDeleteCategory(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateStatusCategoryById(req, res) {
    try {
        const { id, status } = req.params;
        const payload = await CategoryService.updateStatusCategoryById(id, status);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function adminSortIndexCategory(req, res) {
    try {
        const { id } = req.params;
        const { index } = req.query;
        const payload = await CategoryService.adminSortIndexCategory(id, index);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
