import { Router } from 'express';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as SettingController from './settings.controller';

const router = new Router();

router.route('')
  .get(
    //   isAdmin.auth(),
    SettingController.getSettings
  )
  .post(
    //   isAdmin.auth(),
    SettingController.createSetting
  )

router.route('/detail/:id')
  .get(
    //   isAdmin.auth(),
    SettingController.getSetting
  )
  .put(
    //   isAdmin.auth(),
    SettingController.updateSetting
  )

router.route('/point-over-oder')
  .put(
    isAdmin.auth(),
    SettingController.updatePointOverOrder
  )
  .get(
    // isAdmin.auth(),
    SettingController.getPointOverOrder
  );

export default router;
