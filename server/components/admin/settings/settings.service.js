import { ERROR_CODE, SETTING_TYPE } from '../../../../external/constants/constants';
import { getSort } from '../../../../external/middleware/query';
import { error500, errorMessage } from '../../../../external/util/error';
import { createSettingDAO, getSettingDAO, getTotalSettingsDAO } from './settings.dao';

export async function getSettings(query) {
    try {
        const sort = getSort(query);
        const promise = await Promise.all([getTotalSettingsDAO({}), getSettings({}, query, sort)]);
        return [promise[0], promise[1]];
    } catch (error) {
        return error500(error);
    }
}

export async function getSetting(id) {
    try {
        const payload = await getSettingDAO({ _id: id });
        return payload;
    } catch (error) {
        return error500(error);
    }
}

export async function updateSetting(data) {
    try {
        const setting = await getSettingDAO({ _id: data.settingId });
        if (!setting) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        const erArray = [];
        switch (data.type) {
            case SETTING_TYPE.FILTER_SIM_VETIC:
            case SETTING_TYPE.FILTER_SIM_PRICE:
                const nums = data.value.split(',');
                const str = nums.map(async (d, i) => {
                    const isNumber = parseInt(nums[i]);
                    if (!isNumber) {
                        erArray.push(nums[i]);
                    } else {
                        return nums[i];
                    }
                });
                await Promise.all(str);
                setting.data = {
                    value: data.value.join(',')
                }
                await setting.save();
                break;
            default:
                break;
        }
        return setting;
    } catch (error) {
        return error500(error);
    }
}

export async function updatePointOverOrder(body) {
    try {
        const hasSetting = await getSettingDAO({ type: SETTING_TYPE.POINT_OVER_ORDER });
        if (!hasSetting) {
            await createSettingDAO({
                type: SETTING_TYPE.POINT_OVER_ORDER,
                data: {
                    value: body?.value
                }
            });
        } else {
            await hasSetting.updateOne({
                $set: {
                    data: {
                        value: body?.value
                    }
                }
            });
        }
        return true;
    } catch (error) {
        console.log(error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getPointOverOrder() {
    try {
        const hasSetting = await getSettingDAO({ type: SETTING_TYPE.POINT_OVER_ORDER });
        if (!hasSetting) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        return hasSetting;
    } catch (error) {
        console.log(error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
