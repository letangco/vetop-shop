import { body } from 'express-validator';
import validatorErrorHandler from '../../api/validatorErrorHandler';
import { USER_MIN_PASSWORD_LENGTH } from '../../constants';
import {
  ERROR_CODE
} from '../../../external/constants/constants';

export const createProductValidator = [
  body('name').notEmpty().withMessage(ERROR_CODE.PRODUCT_NAME_NOT_EMPTY),
  body('price').notEmpty().withMessage(ERROR_CODE.PRODUCT_PRICE_NOT_EMPTY),
  body('categories').isArray().withMessage(ERROR_CODE.PRODUCT_CATEGORIES_IS_AN_ARRAY),
  body('quantity').isNumeric().withMessage(ERROR_CODE.PRODUCT_QUANTITY_IS_NOT_EMPTY),
  validatorErrorHandler,
];

export const AddRating = [
  body('star').isNumeric().withMessage(ERROR_CODE.RATING_STAR_MUST_BE_NUMBER),
  validatorErrorHandler
];
