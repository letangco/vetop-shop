import { ERROR_CODE, SHARE_HOST } from '../../../../external/constants/constants';
import { error500, errorMessage } from '../../../../external/util/error';
import logger from '../../../api/logger';
import { getStoreInfoByAdmin, getUserByIdStore, getUserInfoByAdmin } from '../../../../internal/grpc/user/request';
import { GetFileData } from '../../../../external/util/file';
import { getProductByCond, getProductById, updateStatusProduct, deleteProductByIdDAO } from '../../product/product.dao';
import { getCategoriesById } from '../../category/category.dao';
import specialProductModel from '../../specialProduct/specialProduct.model';
import { ElasticSearchProduct, RabbitMQ } from '../../../server';
import { ProductsPayload } from '../../../../external/elasticsearch/product/product';
import { getSortBuilder } from '../../../../external/middleware/query';
import slug from 'slug';
import { getAllProductByProductBuilder } from '../../../../internal/elasticsearch/bodybuilder/bodybuilder';
import { findOneProductByCondDAO } from '../../product/product.dao';
import { sendDataToQueue } from '../../../../internal/ rabbitmq/publisher/publisher';
import { QUEUE_NAME } from '../../../../external/constants/job_name';
import ProductModel from '../../product/product.model';
import WishlistModel from '../../wishlist/wishlist.model';

export async function getListProduct(options) {
    try {
        switch (options.status) {
            case 'true':
                options.status = 'true';
                break;
            case 'false':
                options.status = 'false';
                break;
            case '':
            case undefined:
                break;
            default:
                return errorMessage(406, ERROR_CODE.STATUS_INVALID);
        }
        if (parseInt(options.fromPrice, 10) > parseInt(options.toPrice, 10)) return errorMessage(406, ERROR_CODE.PRICE_PRODUCT_INVALID);
        const payload = await getProductByCond(options);
        const listProduct = payload[1];
        const promiseProduct = listProduct.map(async (item) => {
            const specialPro = await specialProductModel.findOne({ productId: item._id });
            if (specialPro) item.specialProduct = true;
            else item.specialProduct = false;
            if (item.categories.length) {
                const arrCate = item.categories.map(async (cate) => {
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
                item.categories = (await Promise.all(arrCate)).filter(cate => cate);
            }
            const hasStore = await getStoreInfoByAdmin(item.storeId);
            if (!hasStore?._id) {
                item.storeId = {};
                item.userInfo = {};
                return item;
            }
            if (hasStore.storeCategories) {
                const arrCate = hasStore.storeCategories.map(async (cate) => {
                    const category = await getCategoriesById(cate);
                    if (!category) return null;
                    return {
                        _id: category._id,
                        name: category.name,
                        description: category.description,
                        image: GetFileData(SHARE_HOST, category.image),
                        icon: GetFileData(SHARE_HOST, category.icon),
                        color: category.color
                    };
                });
                hasStore.storeCategories = (await Promise.all(arrCate)).filter(cate => cate);
            }
            item.storeId = hasStore;
            const userInfo = await getUserByIdStore(hasStore._id);
            item.userInfo = userInfo;
            return item;
        });
        const result = await Promise.all(promiseProduct);
        return [payload[0], result];
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getInfoProductService(id) {
    try {
        let product = await getProductById(id);
        if (!product) return errorMessage(404, ERROR_CODE.PRODUCT_NOT_FOUND);
        product = product.toObject();
        const specialPro = await specialProductModel.findOne({ productId: id });
        if (specialPro) product.specialProduct = true;
        else product.specialProduct = false;
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
                product.storeId = {};
                product.userInfo = {};
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
            const userInfo = await getUserByIdStore(hasStore._id);
            userInfo?._id ? product.userInfo = userInfo : product.userInfo = {};
        }
        return product;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateStatusProductService(id, status) {
    try {
        switch (status) {
            case 'true':
                status = true;
                break;
            case 'false':
                status = false;
                break;
            default:
                return errorMessage(406, ERROR_CODE.STATUS_INVALID);
        }
        const resUpdate = await updateStatusProduct(id, status);
        return resUpdate;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteProductByIdService(id) {
    try {
        await WishlistModel.deleteMany({ productId: id });
        return await deleteProductByIdDAO(id);
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function formatProductByAdmin() {
    try {
        const dataBuilder = getAllProductByProductBuilder();
        const data = await ElasticSearchProduct.SearchElement(ProductsPayload.index, dataBuilder);
        const payload = {
            length: data.hits.total.value,
            deleted: data.hits.hits.length,
            left: parseInt(data.hits.total.value) - parseInt(data.hits.hits.length)
        };
        if (data.hits && data.hits.hits.length > 0) {
            data.hits.hits.map(async (d) => {
                sendDataToQueue(RabbitMQ.getChannel(), QUEUE_NAME.ELASTICSEARCH_REMOVE, {
                    index: ProductsPayload.index,
                    id: d._source.id
                });
            });
        }
        await ProductModel.remove();
        return payload;
    } catch (error) {
        console.log('format product: ', error);
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
