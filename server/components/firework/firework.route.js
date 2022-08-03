import { Router } from 'express';
import { isUser } from '../../../internal/auth/jwt';
import * as FireworkController from './firework.controller';

const router = new Router();

router.route('')
  .get(
      // isUser.auth(),
      FireworkController.getTimeFirework
  )

export default router;
