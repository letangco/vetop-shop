import { Router } from 'express';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as CategoryController from './category.controller';

const router = new Router();

router.route('/')
  .get(
    isAdmin.auth(),
    CategoryController.adminGetCategory
  )
  .post(
    isAdmin.auth(),
    CategoryController.adminCreateCategory
  );

router.route('/:id')
  .get(
    isAdmin.auth(),
    CategoryController.adminGetCategoryById
  )
  .put(
    isAdmin.auth(),
    CategoryController.adminUpdateCategory
  )
  .delete(
    isAdmin.auth(),
    CategoryController.adminDeleteCategory
  );

router.route('/update-status/:id/:status')
  .put(
    isAdmin.auth(),
    CategoryController.updateStatusCategoryById
  );

router.route('/sort-index/:id')
  .put(
    isAdmin.auth(),
    CategoryController.adminSortIndexCategory
  );

export default router;
