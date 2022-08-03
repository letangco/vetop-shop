import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import SimMallAccount from './simMallAccount.model';

export async function createSiMallAccDAO(option) {
    try {
        return await SimMallAccount.create(option);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getSimMallAccDAO(cond) {
    try {
        return await SimMallAccount.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
