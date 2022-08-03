import { SETTING_TYPE } from "../../../external/constants/constants";
import { getMultiSort, getSort } from "../../../external/middleware/query";
import { error500 } from "../../../external/util/error";
import { getSettingDAO, getSettingsDAO, getTotalSettingsDAO } from "../admin/settings/settings.dao";
import { getMetaDataSimCategory } from "../admin/simCategory/simCategory.service";
import { getTotalSim } from "../sim/sim.dao";
import { getSimCategoriesDAO, getSimCategoriesUnlimitDAO, getTotalCategoryDAO } from "./simCategory.dao";

export async function getSimCategory(query) {
    try {
        const sort = getMultiSort(query);
        const promise = await Promise.all([
          getTotalCategoryDAO({ parent: { $exists: false }, status: true }),
          getSimCategoriesDAO({ parent: { $exists: false }, status: true }, query, sort)
        ]);
        const promise2 = promise[1].map(async (item) => {
          item = item.toObject();
          item.children = await getSimCategoriesUnlimitDAO({ parent: item._id, status: true });
          return item;
        });
        const result = await Promise.all(promise2);
        return [promise[0], await getMetaDataSimCategory(result)];
    } catch (error) {
        return error500(error);
    }
}

export async function getSettingsFilter(query) {
  try {
    const sort = getSort(query);
    const promise = await Promise.all([getTotalSettingsDAO({ type: { $in: [SETTING_TYPE.FILTER_SIM_PRICE, SETTING_TYPE.FILTER_SIM_VETIC] }}), getSettingsDAO({ type: { $in: [SETTING_TYPE.FILTER_SIM_PRICE, SETTING_TYPE.FILTER_SIM_VETIC] } }, query, sort)]);
    return [promise[0], promise[1]];
  } catch (error) {
    return error500(error);
  }
}

export async function getSettingFilter(type) {
  try {
    type = parseInt(type);
    return await getSettingDAO({ type });
  } catch (error) {
    return error500(error);
  }
}

export async function SimCategoryService(id, query) {
  try {
    const sort = getSort(query);
    const promise = await Promise.all([getTotalCategoryDAO({ parent: id }), getSimCategoriesDAO({ parent: id }, query, sort)]);
    return [promise[0], promise[1]];
  } catch (error) {
    return error500(error);
  }
}
