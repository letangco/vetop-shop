import { Router } from 'express';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as BankController from './bank.controller';

const router = new Router();
router.route('/')
    .get(
        // isAdmin.auth(),
        BankController.getListReceiveBankSystem
    )
    .post(
        // isAdmin.auth(),
        BankController.createBankSystem
    );

router.route('/:id')
    .put(
        isAdmin.auth(),
        BankController.updateBankSysTem
    )
    .get(
        isAdmin.auth(),
        BankController.getInfoBankSystem
    )
    .delete(
        // isAdmin.auth(),
        BankController.deleteBankSystem
    );

export default router;
