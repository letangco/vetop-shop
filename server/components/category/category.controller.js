import { commonGetQuery } from '../../../external/middleware/query';
import * as CategoryService from './category.service';

export async function getCategories(req, res) {
  try {
    const query = commonGetQuery(req);
    const payload = await CategoryService.getCategories(query);
    return res.RH.paging(payload, query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getCategory(req, res) {
  try {
    return res.RH.success(await CategoryService.getCategory(req.params.id));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function addCategory(req, res) {
  try {
    const data = req.body;
    const auth = req?.user;
    await CategoryService.addCategory(data, auth);
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function editCategory(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    await CategoryService.editCategory(id, data);
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteCategory(req, res) {
  try {
    const id = req.params.id;
    await CategoryService.deleteCategory(id);
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getCategoriesByStoreId(req, res) {
  try {
      const query = commonGetQuery(req);
      const storeId = req.params.id;
      const payload = await CategoryService.getCategoriesByStoreId(storeId, query);
      return res.RH.paging(payload, query.page, query.limit);
  } catch (error) {
      return res.RH.error(error);
  }
}

export async function deleteCategoryStoreId(req, res) {
  try {
    const storeId = req.params.id;
    const payload = await CategoryService.deleteCategoryStoreId(storeId);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function dummyDataCategories(req, res) {
  try {
    const auth = req.user;
    const payload = await CategoryService.dummyDataCategories(auth._id);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function addStoreCategory(req, res) {
  try {
    const storeId = req.user.storeId;
    const categoriesId = req.body.categoriesId;
    const payload = await CategoryService.addStoreCategory(storeId, categoriesId);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getStoreCategoryByToken(req, res) {
  try {
    const storeId = req.user.storeId;
    const query = commonGetQuery(req);
    const payload = await CategoryService.getCategoriesByStoreId(storeId, query);
    return res.RH.paging(payload, query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}
