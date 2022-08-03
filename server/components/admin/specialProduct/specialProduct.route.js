import { Router } from 'express';
import * as SpecialProductController from './specialProduct.controller';
import { isAdmin } from '../../../../internal/auth/jwt';

const router = new Router();

router.route('/')
    .post(
        isAdmin.auth(),
        SpecialProductController.createSpecialProductByAdmin
    )
    .get(
        isAdmin.auth(),
        SpecialProductController.getListSpecialProductByAdmin
    );

router.route('/:id')
    .get(
        isAdmin.auth(),
        SpecialProductController.getInfoSpecialProductByAdmin
    );

router.route('/:productId')
    .delete(
        isAdmin.auth(),
        SpecialProductController.deleteSpecialProductByAdmin
    );

router.route('/sort/:productId')
    .put(
        isAdmin.auth(),
        SpecialProductController.sortSpecialProductByAdmin
    );

export default router;
