import { Router } from 'express';
import * as PaymentListOrderController from './paymentListOrder.controller';

const router = new Router();

router.route('/')
    .get(
        PaymentListOrderController.getListTypePaymentOrder
    );

router.route('/:id')
    .get(
        PaymentListOrderController.getDetailTypePaymentOrder
    );

export default router;
