import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import SimCategory from './simCategory.model';

export async function createSimCateDAO(options) {
    try {
        return await SimCategory.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getSimCategoryDAO(cond) {
    try {
        return await SimCategory.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getSimCategoriesDAO(cond, query, sort) {
    try {
        return await SimCategory.find(cond).skip(query.skip).limit(query.limit).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getSimCategoriesUnlimitDAO(cond) {
    try {
        return await SimCategory.find(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getTotalCategoryDAO(cond) {
    try {
        return await SimCategory.countDocuments(cond);
    } catch (error) {
        console.log(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
