import { Router } from 'express';
import { get } from 'request';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as SimCategoryController from './simCategory.controller';

const router = new Router();

router.route('')
  .post(
      isAdmin.auth(),
      SimCategoryController.addSimCategory
  )
  .get(
      SimCategoryController.getSimCategories
  )
  .put(
    isAdmin.auth(),
    SimCategoryController.updateSimCategory
  )

export default router;
