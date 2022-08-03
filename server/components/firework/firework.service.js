import { SETTING_TYPE } from "../../../external/constants/constants";
import { error500 } from "../../../external/util/error";
import { getSettingDAO } from "../admin/settings/settings.dao";

export async function getTimeFirework() {
    try {
        const timerFirework = await getSettingDAO({ type: SETTING_TYPE.TIME_FIRE_WORK });
        return timerFirework;
    } catch (error) {
        return error500(error);
    }
}
