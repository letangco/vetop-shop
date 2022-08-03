import { ERROR_CODE, SHARE_HOST } from '../../../external/constants/constants';
import { error500, errorMessage } from '../../../external/util/error';
import logger from '../../api/logger';
import SpecialProduct from './specialProduct.model';
import ProductModel from '../product/product.model';
import { getStoreInfoByAdmin } from '../../../internal/grpc/user/request';
import { GetFileData } from '../../../external/util/file';
import { getCategoriesById } from '../category/category.dao';
import { getMultiSort } from '../../../external/middleware/query';

export async function getSpecialProductById(id) {
    try {
        const special = await SpecialProduct.findOne({ productId: id });
        let product = await ProductModel.findOne({ _id: id, status: true }).select({ __v: 0, status: 0, updatedAt: 0 });
        if (!product || !special) return errorMessage(404, ERROR_CODE.PRODUCT_NOT_FOUND);
        product = product.toObject();
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

export async function getListSpecialProduct(options) {
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
            let product = await ProductModel.findOne({ _id: item.productId, status: true }).select({ __v: 0, status: 0, updatedAt: 0 });
            if (!product) return null;
            product = product.toObject();
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
