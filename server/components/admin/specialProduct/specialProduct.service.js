/* eslint-disable new-cap */
import { ERROR_CODE, SHARE_HOST } from "../../../../external/constants/constants";
import { error500, errorMessage } from "../../../../external/util/error";
import logger from '../../../api/logger';
import SpecialProduct from '../../specialProduct/specialProduct.model';
import ProductModel from '../../product/product.model';
import { getStoreInfoByAdmin } from '../../../../internal/grpc/user/request';
import { GetFileData } from "../../../../external/util/file";
import { getCategoriesById } from '../../category/category.dao';
import { getMultiSort } from "../../../../external/middleware/query";
import slug from 'slug';

export async function createSpecialProductByAdmin(body) {
    try {
        if (!body?.index) body.index = 1;
        const product = await ProductModel.findById(body.productId);
        if (!product) return errorMessage(404, ERROR_CODE.PRODUCT_NOT_FOUND);
        const special = await SpecialProduct.findOne({ productId: body.productId });
        if (special) return errorMessage(400, ERROR_CODE.SPECIAL_PRODUCT_EXIST);
        if (product.searchString) {
            body.searchString = product.searchString;
        } else {
            body.searchString = slug(`${product.name} ${product.model} ${product.price} ${product.special}`, ' ');
        }
        return await SpecialProduct.create(body);
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getInfoSpecialProductByAdmin(id) {
    try {
        const special = await SpecialProduct.findOne({ productId: id });
        let product = await ProductModel.findById(id).select({ __v: 0 });
        if (!product || !special) return errorMessage(404, ERROR_CODE.PRODUCT_NOT_FOUND);
        product = product.toObject();
        product.index = special.index;
        if (product.images.length) {
            const arrImageProduct = product.images.map(img => GetFileData(SHARE_HOST, img));
            product.images = arrImageProduct;
        }
        if (product.categories.length) {
            const arrCate = product.categories.map(async (cate) => {
                const category = await getCategoriesById(cate);
                if (!category) return null;
                return {
                    _id: category._id,
                    name: category.name || '',
                    description: category.description || '',
                    image: GetFileData(SHARE_HOST, category.image),
                    icon: GetFileData(SHARE_HOST, category.icon),
                    color: category.color || ''
                };
            });
            product.categories = (await Promise.all(arrCate)).filter(item => item);
        }
        if (product.storeId) {
            const hasStore = await getStoreInfoByAdmin(product.storeId);
            if (!hasStore?._id) {
                product.storeId = null;
                return product;
            }
            if (hasStore.storeCategories.length) {
                const arrCate = hasStore.storeCategories.map(async (cate) => {
                    const category = await getCategoriesById(cate);
                    if (!category) return null;
                    return {
                        _id: category._id,
                        name: category.name || '',
                        description: category.description || '',
                        image: GetFileData(SHARE_HOST, category.image),
                        icon: GetFileData(SHARE_HOST, category.icon),
                        color: category.color || ''
                    };
                });
                hasStore.storeCategories = (await Promise.all(arrCate)).filter(item => item);
            }
            product.storeId = hasStore;
        }
        return product;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getListSpecialProductByAdmin(options) {
    try {
        const sort = getMultiSort(options);
        options.sort = sort;
        const promise = await Promise.all([
            SpecialProduct.countDocuments(),
            SpecialProduct.find()
                .skip(options.skip)
                .limit(options.limit)
                .sort(sort)
        ]);
        const payloadProduct = promise[1].map(async (item) => {
            let product = await ProductModel.findById(item.productId);
            if (!product) return null;
            product = product.toObject();
            product.index = item.index;
            if (product.images.length) {
                const arrImageProduct = product.images.map(img => GetFileData(SHARE_HOST, img));
                product.images = arrImageProduct;
            }
            if (product.categories.length) {
                const arrCate = product.categories.map(async (cate) => {
                    const category = await getCategoriesById(cate);
                    if (!category) return null;
                    return {
                        _id: category._id,
                        name: category.name || '',
                        description: category.description || '',
                        image: GetFileData(SHARE_HOST, category.image),
                        icon: GetFileData(SHARE_HOST, category.icon),
                        color: category.color || ''
                    };
                });
                product.categories = (await Promise.all(arrCate)).filter(item => item);
            }
            if (product.storeId) {
                const hasStore = await getStoreInfoByAdmin(product.storeId);
                if (!hasStore?._id) {
                    product.storeId = null;
                    return product;
                }
                if (hasStore.storeCategories.length) {
                    const arrCate = hasStore.storeCategories.map(async (cate) => {
                        const category = await getCategoriesById(cate);
                        if (!category) return null;
                        return {
                            _id: category._id,
                            name: category.name || '',
                            description: category.description || '',
                            image: GetFileData(SHARE_HOST, category.image),
                            icon: GetFileData(SHARE_HOST, category.icon),
                            color: category.color || ''
                        };
                    });
                    hasStore.storeCategories = (await Promise.all(arrCate)).filter(item => item);
                }
                product.storeId = hasStore;
            }
            return product;
        });
        const payload = await Promise.all(payloadProduct);
        return [promise[0], payload.filter(item => item)];
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteSpecialProductByAdmin(productId) {
    try {
        const hasSpecialProduct = await SpecialProduct.findOne({ productId: productId });
        if (!hasSpecialProduct) return errorMessage(404, ERROR_CODE.SPECIAL_PRODUCT_NOT_FOUND);
        await hasSpecialProduct.remove();
        return true;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function sortSpecialProductByAdmin(productId, index) {
    try {
        const special = await SpecialProduct.findOne({ productId });
        if (!special) return errorMessage(404, ERROR_CODE.SPECIAL_PRODUCT_NOT_FOUND);
        if (!index) index = 1;
        await special.updateOne({
            $set: { index: index }
        });
        return true;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
