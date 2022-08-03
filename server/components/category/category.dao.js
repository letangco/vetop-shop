import { ERROR_CODE, SHARE_HOST } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import Category from './category.model';
import Product from '../product/product.model';
import { GetFileData } from '../../../external/util/file';

export async function createCategoryDAO(options) {
    try {
        return await Category.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneCategoryByCondDAO(cond) {
    try {
        return await Category.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findCategoriesByCondDAO(cond, query) {
    try {
        return await Category.find(cond).sort(query.sort).skip(query.skip).limit(query.limit);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countCategoriesByConDAO(cond) {
    try {
        return await Category.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findCategoriesByCondNoLimitDAO(cond) {
    try {
        return Category.find(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findCategoriesByCondMultiSort(cond, sort) {
    try {
        return Category.find(cond).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteManyCategoriesByCond(cond) {
    try {
        return Category.deleteMany(cond);
    } catch (error) {
        return error500(error);
    }
}

export async function getCategoriesById(id) {
    try {
      const category = await Category.findById(id);
      return category;
    } catch (err) {
      logger.error('Error getCategoriesById: ', err);
      return Promise.reject(new APIError(err.statusCode || 500, err.message || err.errors || 'Database Busy'));
    }
  }

export async function getProductByCategoriesCond(idCate, idStore) {
    try {
        let hasCaterogies = await Category.findById(idCate);
        if (!hasCaterogies) return {};
        hasCaterogies = hasCaterogies.toObject();
        hasCaterogies.createdAt = hasCaterogies.createdAt ? new Date(hasCaterogies.createdAt).toISOString() : '';
        hasCaterogies.image = GetFileData(SHARE_HOST, hasCaterogies.image);
        hasCaterogies.icon = GetFileData(SHARE_HOST, hasCaterogies.icon);
        const storeProduct = await Product.find({
            storeId: idStore,
            categories: { $in: [idCate] }
        });
        const resultProduct = storeProduct.map((pro) => {
            const resultImage = pro.images.map(img => GetFileData(SHARE_HOST, img));
            const temp = pro.toObject();
            const date = temp.createdAt;
            temp.images = resultImage;
            temp.createdAt = new Date(date).toISOString();
            return temp;
        });
        hasCaterogies.products = resultProduct;
        return hasCaterogies;
    } catch (error) {
        return error500(error);
    }
}

export async function sortCategoryByCond(cond, sort) {
    try {
        return await Category.find(cond).sort({ index: 1 });
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
