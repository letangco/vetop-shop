import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import ReportOrder from './reportOrder.model';

export async function getReport(cond) {
    try {
        return await ReportOrder.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR)
    }
}

export async function createReport(options) {
    try {
    return await ReportOrder.create(options);        
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR)
    }
}

