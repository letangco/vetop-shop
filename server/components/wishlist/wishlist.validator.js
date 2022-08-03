import { body, param, query } from 'express-validator';
import validatorErrorHandler from '../../api/validatorErrorHandler';
import { ERROR_CODE } from '../../../external/constants/constants';

export const getWishList = [
  query('fromDay')
    .if(query('fromDay').notEmpty())
    .isISO8601().withMessage(ERROR_CODE.INVALID_DATE),
  query('toDay')
    .if(query('toDay').notEmpty())
    .isISO8601().withMessage(ERROR_CODE.INVALID_DATE),
  validatorErrorHandler,
];
