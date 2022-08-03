import { commonGetQuery } from '../../../external/middleware/query';
import * as productService from './product.service';

export async function getProducts(req, res) {
    try {
        const query = commonGetQuery(req);
        const userId = req?.user?._id;
        const payload = await productService.getProductsService(query, userId);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getProductsByCategoryId(req, res) {
    try {
        const query = commonGetQuery(req);
        const userId = req?.user?._id;
        const payload = await productService.getProductsByCategoryIdService(query, userId);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function createProduct(req, res) {
    try {
        const {
            body
        } = req;
        const auth = req.user;
        const payload = await productService.addProductService(auth, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function searchProduct(req, res) {
    try {
        const query = commonGetQuery(req);
        const userId = req?.user?._id;
        const payload = await productService.searchProduct(query, userId);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListProductByCategoryId(req, res) {
    try {
        const idCategory = req.params.id;
        const query = commonGetQuery(req);
        const userId = req?.user?._id;
        const payload = await productService.getListProductByCategoryIdService(idCategory, query, userId);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListProductByIdStore(req, res) {
    try {
        const storeId = req.params.id;
        const query = commonGetQuery(req);
        const userId = req?.user?._id;
        const payload = await productService.getListProductByIdStore(storeId, query, userId);
        return res.RH.paging(payload, query.page, query.limt);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getProductByTokenStoreId(req, res) {
    try {
        const storeId = req?.user?.storeId;
        const query = commonGetQuery(req);
        const payload = await productService.getListProductByTokenStoreId(storeId, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getProductById(req, res) {
    try {
        const productId = req.params.id;
        const userId = req?.user?._id;
        const payload = await productService.getProductById(productId, userId);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateProductById(req, res) {
    try {
        const productId = req.params.id;
        const payload = await productService.updateProductById(productId, req.body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateImageProduct(req, res) {
    try {
        const { id } = req.params;
        const payload = await productService.updateImageProduct(id, req.body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteProductById(req, res) {
    try {
        const productId = req.params.id;
        const payload = await productService.deleteProductById(productId);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function productFilters(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await productService.productFilters(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function addProductToWishlist(req, res) {
    try {
        const { body } = req;
        const auth = req;
        const payload = await productService.addProductToWishlist(body, auth);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteSpecialProductById(req, res) {
    try {
        const { id } = req.params;
        const payload = await productService.deleteSpecialProductById(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function ratingProductAndStore(req, res) {
    try {
        const { body, user } = req;
        const { type } = req.params;
        const payload = await productService.ratingProductAndStore(user._id, body, type);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getTypeRatingProduct(req, res) {
    try {
        const payload = await productService.getTypeRatingProduct();
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
