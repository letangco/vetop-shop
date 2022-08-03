import { commonGetQuery } from '../../../external/middleware/query';
import * as WishListService from './wishlist.service';

export async function addWishList(req, res) {
    try {
        const { body } = req;
        const userId = req.user._id;
        const payload = await WishListService.addWishList(userId, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function removeProductFromWishList(req, res) {
    try {
        const productId = req.params.id;
        const userId = req.user._id;
        await WishListService.removeProducFromWishList(userId, productId);
        return res.RH.success(true);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getWishLists(req, res) {
    try {
        const query = commonGetQuery(req);
        const userId = req.user._id;
        const payload = await WishListService.getWishLists(userId, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function storeGetWishList(req, res) {
    try {
        const query = commonGetQuery(req);
        const storeId = req.user.storeId;
        const payload = await WishListService.storeGetWishList(storeId, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}
