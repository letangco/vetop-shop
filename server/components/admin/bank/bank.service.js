import { ERROR_CODE, SETTING_TYPE } from '../../../../external/constants/constants';
import { errorMessage } from '../../../../external/util/error';
import { getSettingsDAO, getTotalSettingsDAO, createSettingDAO, getSettingDAO } from '../settings/settings.dao';
import { getSort } from '../../../../external/middleware/query';

export async function getListReceiveBankSystem(options) {
    try {
        const sort = getSort(options);
        const banks = await Promise.all([
            getTotalSettingsDAO({ type: SETTING_TYPE.BANK_INFO }),
            getSettingsDAO({ type: SETTING_TYPE.BANK_INFO }, options, sort)
        ]);
        return [banks[0], banks[1]];
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function createBankSystem(data) {
    try {
        if (!data.bankName && !data.accountNumber && !data.bankBranch && !data.accountNumber) return 'false';
        await createSettingDAO({
            type: SETTING_TYPE.BANK_INFO,
            data: {
                bankName: data.bankName,
                bankBranch: data.bankBranch,
                accountName: data.accountName,
                accountNumber: data.accountNumber
            }
        });
        return true;
    } catch (error) {
        console.log(error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateBankSysTem(id, data) {
    try {
        const hasBank = await getSettingDAO({ _id: id });
        if (!hasBank || hasBank === null) errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        const tempData = hasBank.data;
        Object.keys(data)
            .forEach((key) => {
                tempData[key] = data[key];
            });
        await hasBank.updateOne({
            $set: {
                data: tempData
            }
        });
        return true;
    } catch (error) {
        console.log(error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getInfoBankSystem(id) {
    try {
        const hasBank = await getSettingDAO({ _id: id });
        if (!hasBank || hasBank === null) errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        return hasBank;
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteBankSystem(id) {
    try {
        const hasBank = await getSettingDAO({ _id: id });
        if (!hasBank || hasBank === null) errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        await hasBank.remove();
        return true;
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
