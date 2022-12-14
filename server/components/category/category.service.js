import slug from 'slug';
import Category from './category.model';
import logger from '../../api/logger';
import { error500, errorMessage } from '../../../external/util/error';
import {
  ERROR_CODE, SHARE_HOST
} from '../../../external/constants/constants';
import {
  countCategoriesByConDAO,
  createCategoryDAO, findCategoriesByCondDAO, findCategoriesByCondNoLimitDAO, findOneCategoryByCondDAO, sortCategoryByCond
} from './category.dao';
import {
  countCategoryStoreByCond, createManyCategoryStore, findCategoryStoreByCond, findOneCategoryStore,
  findCategoryStoreByCondNoLimit, deleteManyCategoryStoreDAO, createCategoryStore
} from '../categoryStore/categoryStore.dao';
import { getSort, getMultiSort } from '../../../external/middleware/query';
import { getStoreInfo, updateCategoryStore } from '../../../internal/grpc/user/request';
import { GetFileData } from '../../../external/util/file';

export async function getCategories(query) {
  try {
    const sort = getMultiSort(query);
    query.sort = sort;
    const categories = await Category
    .find({ parent: { $exists: false }, status: true })
    .sort(sort)
    .skip(query.skip)
    .limit(query.limit);
    const page = await countCategoriesByConDAO({ parent: { $exists: false }, status: true });
    const promise = categories.map(async (category) => {
      category = category.toObject();
      category.children = await Category
            .find({ parent: category._id, status: true })
            .sort(sort);
      return category;
    });
    const categoriesList = await Promise.all(promise);
    const result = getMetaDataCategory(categoriesList);
    return [page, result];
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export function getMetaDataCategory(categories) {
  try {
    const isArray = Array.isArray(categories);
    if (!isArray) {
      categories = [categories];
    }
    categories = categories.map((c) => {
      if (c?.image) {
        c.image = GetFileData(SHARE_HOST, c.image);
      }
      if (c?.icon) {
        c.icon = GetFileData(SHARE_HOST, c.icon);
      }
      if (c?.children.length) {
        c.children.forEach((d, i) => {
          c.children[i].image = GetFileData(SHARE_HOST, c.children[i].image);
          c.children[i].icon = GetFileData(SHARE_HOST, c.children[i].icon);
        });
      }
      return c;
    });
    return isArray ? categories : categories[0];
  } catch (error) {
    return error500(error);
  }
}

export async function getCategory(id) {
  try {
    let category = await findOneCategoryByCondDAO({ _id: id, status: true });
    if (!category) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    category = category.toObject();
    category.children = await Category.find({ parent: category._id, status: true }).sort({ index: 1, name: 1 });
    return getMetaDataCategory(category);
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function addCategory(data, auth) {
  try {
    data.adminId = auth._id;
    const category = await createCategoryDAO(data);
    return await category.save();
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function editCategory(id, data) {
  try {
    const category = await Category.findById(id);
    if (!category) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    Object.keys(data).forEach((key) => {
      category[key] = data[key];
    });
    return await category.save();
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteCategory(id) {
  try {
    const category = await Category.findById(id);
    if (!category) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    return await category.remove();
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteCategoryStoreId(id) {
  try {
    const categoryStore = await findOneCategoryStore({ storeId: id });
    if (!categoryStore) return errorMessage(400, ERROR_CODE.CATEGORY_NOT_FOUND);
    await categoryStore.remove();
    return true;
  } catch (error) {
    return error500(error);
  }
}
export async function dummyDataCategories(adminId) {
  try {
    const numCaterory = await Category.countDocuments();
    if (numCaterory) return true;
    await Category.create({
      adminId: adminId,
      name: '??i???n tho???i & ph??? ki???n',
      description: '??i???n tho???i v?? ph??? ki???n',
      status: true,
    }, {
      adminId: adminId,
      name: 'Thi???t b??? ??i???n t???',
      description: 'Thi???t b??? ??i???n t???',
      status: true,
    }, {
      adminId: adminId,
      name: 'Th???i Trang Nam',
      description: 'Th???i Trang Nam',
      status: true,
    }, {
      adminId: adminId,
      name: 'Th???i Trang N???',
      description: 'Th???i Trang N???',
      status: true,
    }, {
      adminId: adminId,
      name: 'M??? & B??',
      description: 'M??? & B??',
      status: true,
    }, {
      adminId: adminId,
      name: 'Nh?? C???a & ?????i S???ng',
      description: 'Nh?? C???a & ?????i S???ng',
      status: true,
    }, {
      adminId: adminId,
      name: 'M??y t??nh & Laptop',
      description: 'M??y t??nh & Laptop',
      status: true,
    }, {
      adminId: adminId,
      name: 'S???c Kh???e & S???c ?????p',
      description: 'S???c Kh???e & S???c ?????p',
      status: true,
    }, {
      adminId: adminId,
      name: 'M??y ???nh - M??y quay phim',
      description: 'M??y ???nh - M??y quay phim',
      status: true,
    }, {
      adminId: adminId,
      name: 'Gi??y D??p N???',
      description: 'Gi??y D??p N???',
      status: true,
    }, {
      adminId: adminId,
      name: '?????ng H???',
      description: '?????ng H???',
      status: true,
    }, {
      adminId: adminId,
      name: 'T??i V??',
      description: 'T??i V??',
      status: true,
    }, {
      adminId: adminId,
      name: 'Gi??y D??p Nam',
      description: 'Gi??y D??p Nam',
      status: true,
    }, {
      adminId: adminId,
      name: 'Ph??? Ki???n Th???i Trang',
      description: 'Ph??? Ki???n Th???i Trang',
      status: true,
    }, {
      adminId: adminId,
      name: 'Thi???t B??? ??i???n Gia D???ng',
      description: 'Thi???t B??? ??i???n Gia D???ng',
      status: true,
    }, {
      adminId: adminId,
      name: 'B??ch H??a Online',
      description: 'B??ch H??a Online',
      status: true,
    }, {
      adminId: adminId,
      name: 'Th??? Thao & Du L???ch',
      description: 'Th??? Thao & Du L???ch',
      status: true,
    }, {
      adminId: adminId,
      name: 'Voucher & D???ch v???',
      description: 'Voucher & D???ch v???',
      status: true,
    }, {
      adminId: adminId,
      name: '?? t?? - Xe M??y - Xe ?????p',
      description: '?? t?? - Xe M??y - Xe ?????p',
      status: true,
    }, {
      adminId: adminId,
      name: 'Nh?? S??ch Online',
      description: 'Nh?? S??ch Online',
      status: true,
    }, {
      adminId: adminId,
      name: '????? Ch??i',
      description: '????? Ch??i',
      status: true,
    }, {
      adminId: adminId,
      name: 'Th???i Trang Tr??? Em',
      description: 'Th???i Trang Tr??? Em',
      status: true,
    }, {
      adminId: adminId,
      name: 'S???n Ph???m Kh??c',
      description: 'S???n Ph???m Kh??c',
      status: true,
    }, {
      adminId: adminId,
      name: 'Gi???t gi?? v?? Ch??m s??c nh?? ???',
      description: 'Gi???t gi?? v?? Ch??m s??c nh?? ???',
      status: true,
    }, {
      adminId: adminId,
      name: 'Ch??m s??c th?? c??ng',
      description: 'Ch??m s??c th?? c??ng',
      status: true,
    });
    // Children Category
    const electricDevice = await Category.findOne({ name: 'Thi???t b??? ??i???n t???' }).lean();
    const mobileDevice = await Category.findOne({ name: '??i???n tho???i & ph??? ki???n' }).lean();
    await Category.create({
      adminId: adminId,
      name: 'Tai nghe',
      description: 'Tai nghe',
      status: true,
      parent: electricDevice._id,
    }, {
      adminId: adminId,
      name: 'Ti vi',
      description: 'Ti vi',
      status: true,
      parent: electricDevice._id,
    }, {
      adminId: adminId,
      name: 'Ph??? ki???n v?? thi???t b??? game',
      description: 'Ph??? ki???n v?? thi???t b??? game',
      status: true,
      parent: electricDevice._id,
    }, {
      adminId: adminId,
      name: '??i???n tho???i',
      description: '??i???n tho???i',
      status: true,
      parent: mobileDevice._id,
    }, {
      adminId: adminId,
      name: 'M??y t??nh b???ng',
      description: 'M??y t??nh b???ng',
      status: true,
      parent: mobileDevice._id,
    });
    return true;
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function addStoreCategory(storeId, category) {
  try {
    if (!Array.isArray(category)) {
      category = [category];
    }
    console.log('category add: ', category);
    const searchStringCategory = '';
    const idList = [];
    const data = [];
    const promise = category.map(async (c, i) => {
      const d = await findOneCategoryByCondDAO({ _id: category[i] });
      if (d?._id) {
        if (!d?.parent) {
          idList.push(d._id);
          data.push({
            storeId,
            categoryId: d._id,
            isParent: true
          });
        } else {
          data.push({
            storeId,
            categoryId: d._id,
            isParent: false
          });
        }
      }
    });
    await Promise.all(promise);
    await deleteManyCategoryStoreDAO({ storeId });
    await createManyCategoryStore(data);
    const payload = await Promise.all([updateCategoryStore(storeId, JSON.stringify(idList), searchStringCategory)]);
    return payload;
  } catch (error) {
    console.log(error);
    return error500(error);
  }
}

export async function getCategoriesByStoreId(storeId, query) {
  try {
    const sort = getMultiSort(query);
    query.sort = sort;
    const data = await Promise.all([countCategoryStoreByCond({ storeId: storeId, isParent: true }), findCategoryStoreByCond({ storeId: storeId, isParent: true }, query, sort)]);
    // list category parent id
    const parentIdList = data[1].map(parent => parent.categoryId.toString());
    // list children
    const categoryStores = (await findCategoryStoreByCondNoLimit({ categoryId: { $nin: parentIdList }, storeId: storeId })).map(child => child.categoryId.toString());
    const categories = await findCategoriesByCondDAO({ parent: { $exists: false }, status: true, _id: { $in: parentIdList } }, query);
    const promise = categories.map(async (category) => {
      category = category.toObject();
      category.children = await findCategoriesByCondNoLimitDAO({
        parent: category._id,
        status: true,
        _id: { $in: categoryStores }
      }, sort);
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
    return [data[0], result];
  } catch (error) {
    return error500(error);
  }
}
