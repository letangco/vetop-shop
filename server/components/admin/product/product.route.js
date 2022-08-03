import { Router } from 'express';
import * as ProductController from './product.controller';
import { isAdmin } from '../../../../internal/auth/jwt';

const router = new Router();

router.route('/')
    .get(
        isAdmin.auth(),
        ProductController.getListProductByAdmin
    );

router.route('/:id')
    .get(
        isAdmin.auth(),
        ProductController.getInfoProductByAdmin
    )
    .delete(
        isAdmin.auth(),
        ProductController.deleteProductByAdmin
    );

router.route('/:id/:status')
    .put(
        isAdmin.auth(),
        ProductController.updateStatusProductByAdmin
    );

router.route('/format-product')
    .post(
      isAdmin.auth(),
      ProductController.formatProductByAdmin
    );

export default router;
