import { Router } from 'express';
import { isUser } from '../../../internal/auth/jwt';
import * as SimMallAccountController from './simMallAccount.controller';

const router = new Router();

router.route('')
  .post(
      isUser.auth(),
      SimMallAccountController.createSimMallAcc
  )
  .put(
    isUser.auth(),
    SimMallAccountController.updateSimMallAcc
  )
  .get(
    isUser.auth(),
    SimMallAccountController.getSimMallAcc
  )

export default router;
