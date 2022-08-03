import { ERROR_CODE, SHARE_HOST } from "../../../external/constants/constants";
import { getSort } from "../../../external/middleware/query";
import { error500, errorMessage } from "../../../external/util/error";
import { GetFileData } from "../../../external/util/file";
import { getStoreInfo, getUserInfo } from "../../../internal/grpc/user/request";
import { stringToJSON } from "../order/order.service";
import { findOneProductByCondDAO } from "../product/product.dao";
import { countWishListByCond, createWishList, findOneWishListByCond, findWishListByCond } from './wishlist.dao';

export async function addWishList(userId, options) {
    try {
        const user = await getUserInfo(userId);
        if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const product = await findOneProductByCondDAO({ _id: options.productId });
        if (!product) return errorMessage(404, ERROR_CODE.PRODUCT_NOT_FOUND);
        const hasWishlist = await findOneWishListByCond({ productId: options.productId, userId });
        if (hasWishlist) return errorMessage(404, ERROR_CODE.WISHLIST_EXIST);
        const newProduct = await createWishList({
            productId: options.productId,
            userId: userId,
            storeId: product.storeId
        });
        return newProduct;
    } catch (error) {
        return error500(error);
    }
}

export async function removeProducFromWishList(userId, productId) {
    try {
        const wishList = await findOneWishListByCond({ userId, productId });
        if (!wishList) return errorMessage(404, ERROR_CODE.WISHLIST_NOT_FOUND);
        await wishList.remove();
        return true;
    } catch (error) {
        return error500(error);
    }
}

export async function getWishLists(userId, query) {
    try {
        const sort = getSort(query);
        const user = await getUserInfo(userId);
        const cond = {
            userId
        };
        if (query?.fromDay && !query?.toDay) {
            cond.createdAt = { $gte: query.fromDay };
        }
        if (query?.toDay && !query?.fromDay) {
            cond.createdAt = { $lte: query.toDay };
        }
        if (query?.toDay && query?.fromDay) {
            cond.createdAt = { $lte: query.toDay, $gte: query.fromDay };
        }
        if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const promise = await Promise.all([countWishListByCond(cond), findWishListByCond(cond, query, sort)]);
        const products = promise[1].map(async (item) => {
            item = item.toObject();
            const product = await findOneProductByCondDAO({ _id: item.productId });
            if (product?.images) {
                product.images.forEach((image, index) => {
                    product.images[index] = GetFileData(SHARE_HOST, product.images[index]);
                });
            }
            item.productId = product;
            return item;
        });
        const result = await Promise.all(products);
        return [promise[0], result];
    } catch (error) {
        return error500(error);
    }
}

export async function storeGetWishList(storeId, query) {
    try {
        const sort = getSort(query);
        const store = await getStoreInfo(storeId);
        if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        const cond = {
            storeId
        };
        if (query?.fromDay && !query?.toDay) {
            cond.createdAt = { $gte: query.fromDay };
        }
        if (query?.toDay && !query?.fromDay) {
            cond.createdAt = { $lte: query.toDay };
        }
        if (query?.toDay && query?.fromDay) {
            cond.createdAt = { $lte: query.toDay, $gte: query.fromDay };
        }
        const promise = await Promise.all([findWishListByCond(cond, query, sort), countWishListByCond(cond)]);
        const promise1 = promise[0].map(async (item) => {
            item = item.toObject();
            const promise2 = await Promise.all([findOneProductByCondDAO({ _id: item.productId }), getUserInfo(item.userId)]);
            item.productId = promise2[0]?._id ? {
                _id: promise2[0]._id,
                name: promise2[0].name,
                quantity: promise2[0].quantity,
                special: promise2[0].special,
                price: promise2[0].price,
                images: promise2[0].images.length ? promise2[0].images.map((img, index) => GetFileData(SHARE_HOST, promise2[0].images[index])) : [],
                description: promise2[0].description,
                vetic: promise2[0].vetic,
                stock_status: promise2[0].stock_status,
                rate: promise2[0].rate
             } : {};
             item.userId = promise2[1]?._id ? {
                 _id: promise2[1]._id,
                 fullName: promise2[1].fullName,
                 avatar: GetFileData(SHARE_HOST, stringToJSON(promise2[1].avatar)),
                 refer: promise2[1].refer,
                 code: promise2[1].code,
                 phone: promise2[1].phone
             } : {};
             return item;
        });
        return [promise[1], await Promise.all(promise1)];
    } catch (error) {
        return error500(error);
    }
}
