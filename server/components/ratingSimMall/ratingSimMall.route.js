import { Router } from 'express';
import { isUser } from '../../../internal/auth/jwt';
import * as RatingSimController from './ratingSimMall.controller';

const router = new Router();

router.route('')
  .post(
      isUser.auth(),
      RatingSimController.addRating
  );

router.route('/store/:id')
  .get(
      isUser.auth(),
      RatingSimController.getRatingByStoreId
  );

export default router;
