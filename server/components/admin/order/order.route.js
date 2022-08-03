import { Router } from 'express';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as OrderController from './order.controller';

const router = new Router();

router.route('/order-get-info/:id')
    .get(
        isAdmin.auth(),
        OrderController.getOrderInfoByAdmin
    );

router.route('/order-list')
    .get(
        isAdmin.auth(),
        OrderController.getListOrderByAdmin
    );

router.route('/order/export-xlx')
    .get(
        isAdmin.auth(),
        OrderController.exportOrderExcelByAdmin
    );

router.route('/order/waiting')
  .get(
      isAdmin.auth(),
      OrderController.getOrderWaitingConfirm
  )
  .put(
      isAdmin.auth(),
      OrderController.handleOrder
  )

  export default router;
