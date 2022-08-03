import { ERROR_CODE, SHARE_HOST, TYPE_SIM_CATEGORY } from "../../../../external/constants/constants";
import { getSort } from "../../../../external/middleware/query";
import { error500, errorMessage } from "../../../../external/util/error";
import { GetFileData } from "../../../../external/util/file";
import { slugString } from "../../../helpers/string.helper";
import { createSimDAO } from "../../sim/sim.dao";
import { getSimCategoriesDAO, getSimCategoryDAO, getTotalCategoryDAO, createSimCateDAO } from '../../simCategory/simCategory.dao';

export async function addSimCategory(body, user) {
  try {
    const options = {};
    if (body?.parent) {
      const parent = await getSimCategoryDAO({ _id: body.parent });
      if (!parent) {
        return errorMessage(404, ERROR_CODE.CATEGORY_NOT_FOUND);
      }
    }
    options.image = body?.image;
    options.type = parseInt(body.type);
    if (!Object.values(TYPE_SIM_CATEGORY).includes(options.type)) {
      options.type = TYPE_SIM_CATEGORY.OTHER;
    }
    switch (options.type) {
      case TYPE_SIM_CATEGORY.NETWORK:
        options.index = 1;
        break;
      case TYPE_SIM_CATEGORY.FORMAT:
        options.index = 2;
        break;
      default:
        options.index = 3;
        break;
    }
    options.adminId = user._id;
    options.status = true;
    options.name = body.name;
    if (body?.parent) {
      options.parent = body.parent;
    }
    options.searchString = slugString(`${body.name}`, ' ');
    const simCategory = await createSimCateDAO(options);
    return simCategory;
  } catch (error) {
    return error500(error);
  }
}

export async function getSimCategories(query) {
  try {
    const sort = getSort(query);
    const promise = await Promise.all([
      getTotalCategoryDAO({ parent: { $exists: false }, status: true }),
      getSimCategoriesDAO({ parent: { $exists: false }, status: true }, query, sort)
    ]);
    const promise2 = promise[1].map(async (item) => {
      item = item.toObject();
      item.children = await getSimCategoryDAO({ parent: item._id, status: true });
      return item;
    });
    const result = await Promise.all(promise2);
    return [promise[0], await getMetaDataSimCategory(result)];
  } catch (error) {
    return error500(error);
  }
}

export async function getMetaDataSimCategory(data) {
  try {
    const isArray = Array.isArray(data);
    if (!isArray) {
      data = [data];
    }
    const medaData = data.map((item) => {
      if (item?.image) {
        item.image = GetFileData(SHARE_HOST, item.image);
      }
      return item;
    });
    return isArray ? medaData : medaData[0];
  } catch (error) {
    return error500(error);
  }
}

export async function updateSimCategory(user, data) {
  try {
    const simCategory = await getSimCategoryDAO({ _id: data.simCategoryId });
    if (!simCategory) return errorMessage(404, ERROR_CODE.CATEGORY_NOT_FOUND);
    simCategory.name = data?.name || simCategory.name;
    simCategory.image = data?.image || simCategory.image;
    simCategory.type = data?.type || simCategory.type;
    simCategory.index = data?.index || simCategory.index;
    simCategory.adminId = user._id;
    await simCategory.save();
    return simCategory;
  } catch (error) {
    return error500(error);
  }
}
