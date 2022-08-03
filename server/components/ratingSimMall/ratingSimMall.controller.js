import { commonGetQuery } from '../../../external/middleware/query';
import * as RatingSimService from './ratingSimMall.service';

export async function addRating(req, res) {
    try {
        const { user } = req;
        const { body } = req;
        const payload = await RatingSimService.addRating(user, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getRatingByStoreId(req, res) {
    try {
        const query = commonGetQuery(req);
        const { user } = req;
        const payload = await RatingSimService.getRatingByStoreId(user, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}
