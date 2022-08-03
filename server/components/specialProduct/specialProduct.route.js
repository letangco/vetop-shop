import { Router } from 'express';
import * as SpecialProductController from './specialProduct.controller';

const router = new Router();

router.route('/')
    .get(
        SpecialProductController.getListSpecialProduct
    );

router.route('/:id')
    .get(
        SpecialProductController.getSpecialProductById
    );

export default router;
