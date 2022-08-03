import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import RatingSim from './ratingSimMall.model';

export async function createRatingSimDAO(options) {
    try {
        return await RatingSim.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getRatingsDAO(cond, query, sort) {
    try {
        return await RatingSim.find(cond).skip(query.skip).limit(query.limit).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getRatingDAO(cond) {
    try {
        return await RatingSim.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getTotalRatingSimDAO(cond) {
    try {
        return await RatingSim.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getTotalRatingDAO(cond) {
    try {
        return await RatingSim.aggregate([
            { $match: cond },
            { $group: { _id: null, owner: { $first: '$owner' }, totalRating: { $sum: '$rating' }, count: { $sum: 1 } } }
        ]);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
