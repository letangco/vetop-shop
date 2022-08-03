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
      name: 'Điện thoại & phụ kiện',
      description: 'Điện thoại và phụ kiện',
      status: true,
    }, {
      adminId: adminId,
      name: 'Thiết bị điện tử',
      description: 'Thiết bị điện tử',
      status: true,
    }, {
      adminId: adminId,
      name: 'Thời Trang Nam',
      description: 'Thời Trang Nam',
      status: true,
    }, {
      adminId: adminId,
      name: 'Thời Trang Nữ',
      description: 'Thời Trang Nữ',
      status: true,
    }, {
      adminId: adminId,
      name: 'Mẹ & Bé',
      description: 'Mẹ & Bé',
      status: true,
    }, {
      adminId: adminId,
      name: 'Nhà Cửa & Đời Sống',
      description: 'Nhà Cửa & Đời Sống',
      status: true,
    }, {
      adminId: adminId,
      name: 'Máy tính & Laptop',
      description: 'Máy tính & Laptop',
      status: true,
    }, {
      adminId: adminId,
      name: 'Sức Khỏe & Sắc Đẹp',
      description: 'Sức Khỏe & Sắc Đẹp',
      status: true,
    }, {
      adminId: adminId,
      name: 'Máy ảnh - Máy quay phim',
      description: 'Máy ảnh - Máy quay phim',
      status: true,
    }, {
      adminId: adminId,
      name: 'Giày Dép Nữ',
      description: 'Giày Dép Nữ',
      status: true,
    }, {
      adminId: adminId,
      name: 'Đồng Hồ',
      description: 'Đồng Hồ',
      status: true,
    }, {
      adminId: adminId,
      name: 'Túi Ví',
      description: 'Túi Ví',
      status: true,
    }, {
      adminId: adminId,
      name: 'Giày Dép Nam',
      description: 'Giày Dép Nam',
      status: true,
    }, {
      adminId: adminId,
      name: 'Phụ Kiện Thời Trang',
      description: 'Phụ Kiện Thời Trang',
      status: true,
    }, {
      adminId: adminId,
      name: 'Thiết Bị Điện Gia Dụng',
      description: 'Thiết Bị Điện Gia Dụng',
      status: true,
    }, {
      adminId: adminId,
      name: 'Bách Hóa Online',
      description: 'Bách Hóa Online',
      status: true,
    }, {
      adminId: adminId,
      name: 'Thể Thao & Du Lịch',
      description: 'Thể Thao & Du Lịch',
      status: true,
    }, {
      adminId: adminId,
      name: 'Voucher & Dịch vụ',
      description: 'Voucher & Dịch vụ',
      status: true,
    }, {
      adminId: adminId,
      name: 'Ô tô - Xe Máy - Xe Đạp',
      description: 'Ô tô - Xe Máy - Xe Đạp',
      status: true,
    }, {
      adminId: adminId,
      name: 'Nhà Sách Online',
      description: 'Nhà Sách Online',
      status: true,
    }, {
      adminId: adminId,
      name: 'Đồ Chơi',
      description: 'Đồ Chơi',
      status: true,
    }, {
      adminId: adminId,
      name: 'Thời Trang Trẻ Em',
      description: 'Thời Trang Trẻ Em',
      status: true,
    }, {
      adminId: adminId,
      name: 'Sản Phẩm Khác',
      description: 'Sản Phẩm Khác',
      status: true,
    }, {
      adminId: adminId,
      name: 'Giặt giũ và Chăm sóc nhà ở',
      description: 'Giặt giũ và Chăm sóc nhà ở',
      status: true,
    }, {
      adminId: adminId,
      name: 'Chăm sóc thú cưng',
      description: 'Chăm sóc thú cưng',
      status: true,
    });
    // Children Category
    const electricDevice = await Category.findOne({ name: 'Thiết bị điện tử' }).lean();
    const mobileDevice = await Category.findOne({ name: 'Điện thoại & phụ kiện' }).lean();
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
      name: 'Phụ kiện và thiết bị game',
      description: 'Phụ kiện và thiết bị game',
      status: true,
      parent: electricDevice._id,
    }, {
      adminId: adminId,
      name: 'Điện thoại',
      description: 'Điện thoại',
      status: true,
      parent: mobileDevice._id,
    }, {
      adminId: adminId,
      name: 'Máy tính bảng',
      description: 'Máy tính bảng',
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
