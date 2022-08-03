import { Router } from 'express';
import { isUser } from '../../../internal/auth/jwt';
import * as SimController from './sim.controller';

const router = new Router();

router.route('')
  .post(
    isUser.auth(),
    SimController.addSim
  )
  .get(
    isUser.auth(),
    SimController.getSim
  );

router.route('/change-status')
  .put(
    isUser.auth(),
    SimController.changeStatusSim
  );

router.route('/detail/:id')
  .delete(
    isUser.auth(),
    SimController.removeSim
  )
  .get(
    isUser.auth(),
    SimController.getDetailSim
  );

router.route('/history/:sim')
  .get(
    isUser.auth(),
    SimController.getHistorySim
  );


router.route('/list/owner')
  .get(
    isUser.auth(),
    SimController.getSimOwner
  )
  
export default router;
