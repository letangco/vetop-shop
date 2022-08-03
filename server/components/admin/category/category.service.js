/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { ERROR_CODE, SHARE_HOST, UPDATE_STATUS_CATEGORY } from "../../../../external/constants/constants";
import { getSort, getMultiSort } from "../../../../external/middleware/query";
import { error500, errorMessage } from "../../../../external/util/error";
import {
  countCategoriesByConDAO, createCategoryDAO, findCategoriesByCondDAO, findCategoriesByCondNoLimitDAO, findOneCategoryByCondDAO
} from '../../category/category.dao';
import { getMetaDataCategory } from '../../category/category.service';
import logger from '../../../api/logger';
import { GetFileData, updateLinkImageByAdmin } from '../../../../external/util/file';
import Category from '../../category/category.model';
import Product from '../../product/product.model';
import { countCategoryStoreByCond, findCategoryStoreByCond, findCategoryStoreByCondNoLimit } from "../../categoryStore/categoryStore.dao";

function sortListCateByIndex(arr) {
  const arrIndex = arr.filter(item => item).sort((a, b) => a.index - b.index);
  return arrIndex.sort((a, b) => {
    if ((a.index && !b.index)) return -1;
    if ((!a.index && b.index)) return 1;
    if ((a.name < b.name) && (!a.index && !b.index)) return -1;
    if ((a.name < b.name) && (a.index === b.index)) return -1;
    return 0;
  });
}

export async function adminGetCategory(query) {
  try {
    const sort = getMultiSort(query);
    query.sort = sort;
    const categories = await Category
      .find({ parent: { $exists: false } })
      .sort(sort)
      .skip(query.skip)
      .limit(query.limit);
    const page = await countCategoriesByConDAO({ parent: { $exists: false } });
    const promise = categories.map(async (category) => {
      category = category.toObject();
      category.children = await Category
        .find({ parent: category._id })
        .sort(sort);
      return category;
    });
    const categoriesList = await Promise.all(promise);
    const result = getMetaDataCategory(categoriesList);
    return [page, result];
  } catch (error) {
    return error500(error);
  }
}

export async function adminGetCategoryById(id, query) {
  try {
    const sort = getMultiSort(query);
    query.sort = sort;
    let category = await findOneCategoryByCondDAO({ _id: id });
    if (!category) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    category = category.toObject();
    category.children = await Category.find({ parent: category._id }).sort(sort);
    return getMetaDataCategory(category);
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function adminCreateCategory(data, auth) {
  try {
    data.adminId = auth._id;
    if (data?.icon) {
      data.icon = updateLinkImageByAdmin(data.icon, SHARE_HOST);
    }
    if (data?.image) {
      data.image = updateLinkImageByAdmin(data.image, SHARE_HOST);
    }
    if (!data.index) {
      data.index = 1;
    }
    if (data.parent === '' || !data.parent) {
      delete data.parent;
    } else {
      const hasParent = await findOneCategoryByCondDAO({ _id: data.parent });
      if (!hasParent) return errorMessage(404, ERROR_CODE.CATEGORY_NOT_FOUND);
    }
    return await Category.create(data);
  } catch (error) {
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function adminUpdateCategory(id, data) {
  try {
    const category = await findOneCategoryByCondDAO({ _id: id });
    if (!category) return errorMessage(404, ERROR_CODE.CATEGORY_NOT_FOUND);
    if (data.parent === '' || !data.parent) {
      delete data.parent;
    } else {
      const hasParent = await findOneCategoryByCondDAO({ _id: data.parent });
      if (!hasParent) return errorMessage(404, ERROR_CODE.CATEGORY_NOT_FOUND);
      const parent1 = await findOneCategoryByCondDAO({ _id: hasParent.parent });
      if (parent1 || hasParent?.parent) return errorMessage(406, ERROR_CODE.CREATE_CATEGORY_ERROR);
    }
    if (data?.icon) {
      data.icon = updateLinkImageByAdmin(data.icon, SHARE_HOST);
    }
    if (data?.image) {
      data.image = updateLinkImageByAdmin(data.image, SHARE_HOST);
    }
    Object.keys(data).forEach((key) => {
      category[key] = data[key];
    });
    return await category.save();
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function adminDeleteCategory(id) {
  try {
    const promise = await Promise.all([
      findOneCategoryByCondDAO({ _id: id }),
      findOneCategoryByCondDAO({ parent: id }),
    ]);
    if (!promise[0]) return errorMessage(404, ERROR_CODE.CATEGORY_NOT_FOUND);
    if (promise[1]) return errorMessage(406, ERROR_CODE.DELETE_NOT_ACCEPTABLE);
    await Promise.all([
      Product.updateMany({
        $pull: { categories: { $in: [id] } }
      }),
      promise[0].remove()
    ]);
    return true;
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function updateStatusCategoryById(id, status) {
  try {
    const cate = await findOneCategoryByCondDAO({ _id: id });
    if (!cate) return errorMessage(404, ERROR_CODE.CATEGORY_NOT_FOUND);
    if (!Object.values([UPDATE_STATUS_CATEGORY.TRUE.toString(), UPDATE_STATUS_CATEGORY.FALSE.toString()]).includes(status)) {
      return errorMessage(400, ERROR_CODE.TYPE_UPDATE_CATEGORY_INVALID);
    }
    await cate.updateOne({
      status: status
    });
    return true;
  } catch (error) {
    logger.error(error);
    return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function adminSortIndexCategory(id, index) {
  try {
    const category = await findOneCategoryByCondDAO({ _id: id });
    if (!category) return errorMessage(404, ERROR_CODE.CATEGORY_NOT_FOUND);
    if (!index) index = 1;
    await category.updateOne({
      $set: { index: index }
    });
    return true;
  } catch (error) {
    logger.error(error);
    return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function adminGetCategoriesByIdStore(storeId) {
  try {
    const sort = getMultiSort({});
    const data = await Promise.all([
      countCategoryStoreByCond({ storeId, isParent: true }),
      findCategoryStoreByCond({ storeId, isParent: true }, {}, sort)
    ]);
    const parentIdList = data[1].map(parent => parent.categoryId.toString());
    const categoryStores = (await findCategoryStoreByCondNoLimit({ categoryId: { $nin: parentIdList } })).map(child => child.categoryId.toString());
    const categories = await Category
                            .find({ parent: { $exists: false }, _id: { $in: parentIdList } })
                            .select({ searchString: 0, __v: 0 })
                            .sort(sort);
    const promise = categories.map(async (category) => {
      category = category.toObject();
      category.children = await Category
                                .find({ parent: category._id, _id: { $in: categoryStores } })
                                .select({ searchString: 0, __v: 0 })
                                .sort(sort);
      return category;
    });
    let result = await Promise.all(promise);
    result = result.map((item) => {
      item.image = GetFileData(SHARE_HOST, item.image) || {};
      item.icon = GetFileData(SHARE_HOST, item.icon) || {};
      if (item?.children.length) {
        item.children.forEach((childrens, i) => {
          item.children[i].image = GetFileData(SHARE_HOST, item.children[i].image) || {};
          item.children[i].icon = GetFileData(SHARE_HOST, item.children[i].icon) || {};
        });
      }
      return item;
    });
    return result;
  } catch (error) {
    logger.error(error);
    return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

