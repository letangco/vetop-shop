import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import CategoryStore from './categoryStore.model';

export async function createCategoryStore(options) {
    try {
        return CategoryStore.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function createManyCategoryStore(options) {
    try {
        return await CategoryStore.insertMany(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR)
    }
}

export async function findCategoryStoreByCond(cond, query, sort) {
    try {
        return await CategoryStore.find(cond).sort(sort).skip(query.skip).limit(query.limit);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findCategoryStoreByCondNoLimit(cond) {
    try {
        return await CategoryStore.find(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countCategoryStoreByCond(cond) {
    try {
        return CategoryStore.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneCategoryStore(cond) {
    try {
        return await CategoryStore.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneCategoryStoreAndUpdate(cond, opt) {
    try {
        return await CategoryStore.findOneAndUpdate(cond, opt);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteManyCategoryStoreDAO(cond) {
    try {
        return await CategoryStore.deleteMany(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
