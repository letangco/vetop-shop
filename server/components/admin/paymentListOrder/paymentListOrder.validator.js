import { body } from 'express-validator';
import validatorErrorHandler from '../../../api/validatorErrorHandler';
import {
  ERROR_CODE
} from '../../../../external/constants/constants';

export const createTypePaymentOrder = [
  body('name').notEmpty().withMessage(ERROR_CODE.NAME_TYPE_PAYMENT_ORDER_INVALID),
  body('type').notEmpty().withMessage(ERROR_CODE.TYPE_PAYMENT_ORDER_INVALID),
  validatorErrorHandler,
];

export const updateTypePaymentOrder = [
  body('name').notEmpty().withMessage(ERROR_CODE.NAME_TYPE_PAYMENT_ORDER_INVALID),
  body('type').notEmpty().withMessage(ERROR_CODE.TYPE_PAYMENT_ORDER_INVALID),
  validatorErrorHandler,
];
