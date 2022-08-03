import { Router } from 'express';
import { isUser } from '../../../internal/auth/jwt';
import * as SimOrderController from './simOrder.controller';

const router = new Router();

router.route('/create')
    .post(
      isUser.auth(),
      SimOrderController.createOrder
    )
    .get(
        isUser.auth(),
        SimOrderController.getOrders
    )

router.route('/detail/:id')
    .get(
        isUser.auth(),
        SimOrderController.getOrder
    )

router.route('/update-sim-from-order')
  .put(
      isUser.auth(),
      SimOrderController.updateSimFromOrder
  )

export default router;
