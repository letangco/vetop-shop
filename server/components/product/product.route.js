import { Router } from 'express';
import { isStore, isUser, isAdmin, isAuthorized } from '../../../internal/auth/jwt';
import * as ProductValidation from './product.validator';
import * as productController from './product.controller';

const router = new Router();

router.route('/')
  .get(
    isAuthorized(),
    productController.getProducts
  );

router.route('/')
  .post(
    isStore.auth(),
    ProductValidation.createProductValidator,
    productController.createProduct
  );

router.route('/search-product/')
  .get(
    isAuthorized(),
    productController.searchProduct
  );

router.route('/:id')
  .get(
    isAuthorized(),
    productController.getProductById
  )
  .delete(
    isStore.auth(),
    productController.deleteProductById
  )
  .put(
    isStore.auth(),
    productController.updateProductById
  );

router.route('/image-product/:id')
 .put(
   isStore.auth(),
   productController.updateImageProduct
 )

router.route('/category/:id')
  .get(
    isAuthorized(),
    productController.getListProductByCategoryId
  );

router.route('/filter/product')
  .get(
    productController.productFilters
  );

router.route('/add-wish-list')
  .post(
    isUser.auth(),
    productController.addProductToWishlist
  );

router.route('/store/:id')
  .get(
    isAuthorized(),
    productController.getListProductByIdStore
  );

router.route('/list/store/')
  .get(
    isStore.auth(),
    productController.getProductByTokenStoreId
  );

router.route('/rating/:type/')
  .post(
    isUser.auth(),
    ProductValidation.AddRating,
    productController.ratingProductAndStore
  );

router.route('/type-rating/product')
  .get(
    productController.getTypeRatingProduct
  );

export default router;
