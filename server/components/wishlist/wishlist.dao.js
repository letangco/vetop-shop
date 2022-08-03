import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import logger from '../../api/logger';
import Wishlist from './wishlist.model';

export async function createWishList(options) {
    try {
        return await Wishlist.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneWishListByCond(cond) {
    try {
        return await Wishlist.findOne(cond);
    } catch (error) {
        logger.error('error', error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findWishListByCond(cond, query, sort) {
    try {
        return await Wishlist.find(cond).skip(query.skip).limit(query.limit).sort(sort);
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countWishListByCond(cond) {
    try {
        return await Wishlist.countDocuments(cond);
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
