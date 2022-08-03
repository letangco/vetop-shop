import { Router } from 'express';
import * as CategoryController from './category.controller';
import { isAdmin, isStore, isUser } from '../../../internal/auth/jwt';

const router = new Router();
router.route('/detail/:id')
  .get(
    CategoryController.getCategory
  );
router.route('/:id')
  .put(
    isAdmin.auth(),
    CategoryController.editCategory
  );
router.route('/:id')
  .delete(
    isUser.auth(),
    CategoryController.deleteCategory
  );
router.route('/')
  .post(
    isAdmin.auth(),
    CategoryController.addCategory
  );
router.route('/')
  .get(
    CategoryController.getCategories
  );
router.route('/store/:id')
  .get(
    CategoryController.getCategoriesByStoreId
  )
  .delete(
    isStore.auth(),
    CategoryController.deleteCategoryStoreId
  );

router.route('/dummy/categories')
  .get(
    isAdmin.auth(),
    CategoryController.dummyDataCategories
  );

router.route('/store-category/')
  .post(
    isStore.auth(),
    CategoryController.addStoreCategory
  )
  .get(
    isStore.auth(),
    CategoryController.getStoreCategoryByToken
  );

export default router;
