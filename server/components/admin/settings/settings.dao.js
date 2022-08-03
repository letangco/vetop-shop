import { ERROR_CODE } from '../../../../external/constants/constants';
import { error500 } from '../../../../external/util/error';
import Setting from './settings.model';

export async function createSettingDAO(options) {
    try {
        return await Setting.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getSettingDAO(cond) {
    try {
        return await Setting.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getSettingsDAO(cond, query, sort) {
    try {
        return await Setting.find(cond).skip(query.skip).limit(query.limit).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getTotalSettingsDAO(cond) {
    try {
        return await Setting.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
