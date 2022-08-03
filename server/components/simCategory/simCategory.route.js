import { Router } from 'express';
import * as SimCategoryController from './simCategory.controller';

const router = new Router();

router.route('')
  .get(
    SimCategoryController.getSimCategory
  )

router.route('/filter')
  .get(
    SimCategoryController.getSettingsFilter
  )

  router.route('/filter/detail')
  .get(
    SimCategoryController.getSettingFilter
  )

router.route('/detail/:id')
  .get(
    SimCategoryController.getSimCategoryById
  )

export default router;