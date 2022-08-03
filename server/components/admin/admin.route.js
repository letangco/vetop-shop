import { Router } from 'express';
import * as adminController from './admin.controller';
import { isAdmin } from '../../../internal/auth/jwt';
import Category from './category/category.route';
import SpecialProduct from './specialProduct/specialProduct.route';
import Product from './product/product.route';
import Order from './order/order.route';
import SimCategory from './simCategory/simCategory.route';
import Settings from './settings/settings.route';
import Bank from './bank/bank.route';
import PaymentOrder from './paymentListOrder/paymentListOrder.route';

const router = new Router();
router.use('/management-category/', [Category]);
router.use('/special-product', [SpecialProduct]);
router.use('/product', [Product]);
router.use('/', [Order]);
router.use('/sim-category', [SimCategory]);
router.use('/settings', [Settings]);
router.use('/bank-management', [Bank]);
router.use('/payment-order', [PaymentOrder]);

export default router;
