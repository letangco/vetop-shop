import { ERROR_CODE, TYPE_RATING } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import Rating from './rating.model';

export async function createRatingDAO(option) {
    try {
        return await Rating.create(option);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findRatingByCond(cond, query, sort) {
    try {
        return await Rating.find(cond).sort(sort).skip(query.skip).limit(query.limit);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findRatingByCondUnlimit(cond, query, sort) {
    try {
        return await Rating.find(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countRatingByCond(cond) {
    try {
        return await Rating.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateTotalRating(cond, type) {
    try {
        if (type === TYPE_RATING.PRODUCT) {
            return await Rating.aggregate([
                { $match: cond },
                { $group: { _id: null, productId: { $first: '$productId' }, totalStar: { $sum: '$star' }, count: { $sum: 1 } } }
            ]);
        }
        return await Rating.aggregate([
            { $match: cond },
            { $group: { _id: null, storeId: { $first: '$storeId' }, totalStar: { $sum: '$star' }, count: { $sum: 1 } } }
        ]);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
