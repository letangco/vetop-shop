import { Router } from 'express';
import CategoryRouter from '../../components/category/category.route';
import ProductRouter from '../../components/product/product.route';
import OrderRouter from '../../components/order/order.route';
import AdminRouter from '../../components/admin/admin.route';
import WishList from '../../components/wishlist/wishlist.route';
import SpecialProductRouter from '../../components/specialProduct/specialProduct.route';
import SimRouter from '../../components/sim/sim.route';
import SimCategoryRouter from '../../components/simCategory/simCategory.route';
import SimOrder from '../../components/simOrder/simOrder.route';
import RatingSimRouter from '../../components/ratingSimMall/ratingSimMall.route';
import FireWork from '../../components/firework/firework.route';
import SimMallAccount from '../../components/simMallAccount/simMallAccount.route';
import PaymentListOrder from '../../components/paymentListOrder/paymentListOrder.router';

const router = new Router();

router.use('/categories', CategoryRouter);
router.use('/products', ProductRouter);
router.use('/orders', OrderRouter);
router.use('/admin', AdminRouter);
router.use('/wishlist', WishList);
router.use('/special-product', SpecialProductRouter);
router.use('/sim-mall', SimRouter);
router.use('/sim-category', SimCategoryRouter);
router.use('/sim-order', [SimOrder]);
router.use('/rating-sim-mall', RatingSimRouter);
router.use('/fire-work', [FireWork]);
router.use('/sim-mall-account', [SimMallAccount]);
router.use('/payment-order', [PaymentListOrder]);

export default router;
