import { Router } from 'express';
import { isStore, isUser } from '../../../internal/auth/jwt';
import * as WishListController from './wishlist.controller';
import * as WishListValidator from './wishlist.validator';

const router = new Router();

router.route('/')
  .post(
      isUser.auth(),
      WishListController.addWishList
  )
  .get(
      isUser.auth(),
      WishListValidator.getWishList,
      WishListController.getWishLists
  );

router.route('/:id')
  .delete(
      isUser.auth(),
      WishListController.removeProductFromWishList
  );

router.route('/store/')
  .get(
      isStore.auth(),
      WishListController.storeGetWishList
  );

export default router;
