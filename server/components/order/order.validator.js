import { body } from 'express-validator';
import validatorErrorHandler from '../../api/validatorErrorHandler';
import { USER_MIN_PASSWORD_LENGTH } from '../../constants';
import {
  ERROR_CODE
} from '../../../external/constants/constants';

export const createOrderValidator = [
  body('vetic').notEmpty().withMessage(ERROR_CODE.VETIC_MUST_BE_NUMBER),
  body('vetic').isNumeric().withMessage(ERROR_CODE.VETIC_MUST_BE_NUMBER),
  body('total').isNumeric().withMessage(ERROR_CODE.TOTAL_MUST_BE_NUMBER),
  body('total').notEmpty().withMessage(ERROR_CODE.TOTAL_MUST_BE_NUMBER),
  body('type').notEmpty().withMessage(ERROR_CODE.TYPE_VETIC_MUST_BE_NUMBER),
  body('type').isNumeric().withMessage(ERROR_CODE.TYPE_VETIC_MUST_BE_NUMBER),
  body('code').notEmpty().withMessage(ERROR_CODE.CODE_IS_NOT_EMPTY),
  validatorErrorHandler,
];

export const AddRating = [
  body('star').isNumeric().withMessage(ERROR_CODE.RATING_STAR_MUST_BE_NUMBER),
  validatorErrorHandler
];
