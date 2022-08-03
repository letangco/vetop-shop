import { Router } from 'express';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as PaymentListOrderController from './paymentListOrder.controller';
import * as PaymentOrderValidator from './paymentListOrder.validator';

const router = new Router();

router.route('/')
    .post(
        isAdmin.auth(),
        PaymentOrderValidator.createTypePaymentOrder,
        PaymentListOrderController.createPaymentOrder
    )
    .get(
        isAdmin.auth(),
        PaymentListOrderController.getListTypePaymentOrder
    );

router.route('/:id')
    .delete(
        isAdmin.auth(),
        PaymentListOrderController.deleteTypePaymentOrder
    )
    .put(
        isAdmin.auth(),
        PaymentOrderValidator.updateTypePaymentOrder,
        PaymentListOrderController.updateTypePaymentOrder
    )
    .get(
        isAdmin.auth(),
        PaymentListOrderController.getDetailTypePaymentOrder
    );

router.route('/:id/:status')
    .put(
        isAdmin.auth(),
        PaymentListOrderController.updateStatusPaymentOrder
    );

export default router;
