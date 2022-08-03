import { ERROR_CODE, TYPE_LOGIN } from "../../../external/constants/constants";
import { error500, errorMessage } from "../../../external/util/error";
import { getStoreInfo, getUserInfo, updateRatingSim } from "../../../internal/grpc/user/request";
import { getTotalSettingsDAO } from "../admin/settings/settings.dao";
import { createRatingSimDAO, getRatingDAO, getRatingsDAO, getTotalRatingDAO, getTotalRatingSimDAO } from './ratingSimMall.dao';

export async function addRating(user, data) {
    try {
        const profile = await getUserInfo(user._id);
        if (!profile._id) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const owner = await getSimMallAccDAO({ user: data.owner });
        if (!owner._id) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const hasRating = await getRatingDAO({ owner: data.owner, user: user._id });
        if (hasRating) return errorMessage(404, ERROR_CODE.RATING_EXISTS);
        const totalRating = await getTotalRatingDAO({ user: data.owner });
        let totalRate = 0;
        if (totalRating.length) {
            totalRate = totalRating[0].totalRating / totalRating[0].count;
        }
        owner.rate = totalRate;
        await owner.save();
        const newRatingSim = await createRatingSimDAO({
            user: profile._id,
            simOwner: data.owner,
            comment: data?.comment || '',
            rating: data.rating,
            typeOwner: data.typeOwner
        });
        return newRatingSim;
    } catch (error) {
        return error500(error)
    }
}