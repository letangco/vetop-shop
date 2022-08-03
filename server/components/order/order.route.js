import { Router } from 'express';
import { isStore, isUser } from '../../../internal/auth/jwt';
import * as OrderController from './order.controller';

const router = new Router();

router.route('/')
  .put(
    isStore.auth(),
    OrderController.updateStatusOrder
  );

router.route('/payment-draff')
  .put(
    isStore.auth(),
    OrderController.paymentDraffOrder
  );

router.route('/payment-draff/type-payment')
  .put(
    isStore.auth(),
    OrderController.handleTypePaymentDraffOrder
  );

router.route('/create')
  .post(
    isStore.auth(),
    OrderController.createOrder
  );

router.route('/buyer/')
  .get(
    isUser.auth(),
    OrderController.getOrderBuyer
  );
router.route('/buyer/detail/:id')
  .get(
    isUser.auth(),
    OrderController.getOrderBuyerById
  )

router.route('/list/')
  .get(
    isStore.auth(),
    OrderController.getOrders
  );

router.route('/detail/:id/')
  .get(
    isStore.auth(),
    OrderController.getOrdersById
  )
  .delete(
    isStore.auth(),
    OrderController.deleteOrderDraftBydId
  );

router.route('/status-order/')
  .get(
    isStore.auth(),
    OrderController.getStatusOrder
  );

router.route('/type-order/')
  .get(
    isStore.auth(),
    OrderController.getTypeOrder
  );

router.route('/vetic-receive/')
  .get(
    isUser.auth(),
    OrderController.getVeticReceive
  );

router.route('/buyer-list/')
  .get(
    isStore.auth(),
    OrderController.getBuyerOrder
  );

router.route('/sales/staff/:staffId')
  .get(
    isStore.auth(),
    OrderController.getSalesListStaff
  );

export default router;
