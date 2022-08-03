import Language from '../locale/language';
import APIError from './APIError';
import { ERROR_CODE } from '../constants/constants';

const LanguageInit = new Language();

export function parseString(str) {
  var args = [].slice.call(arguments, 1),
      i = 0;

  return str.replace(/%s/g, () => args[i++]);
}


export function errorMessage(code, message) {
  return Promise.reject(new APIError(code, [
    {
      message: LanguageInit.getErrorMessage(message),
      param: message
    }
  ]))
}

function formatNumberCurrencyVND(value) {
  const valueFormat = value.toString().replace(/[,.]/g, '');
  return valueFormat.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

export function errorMessagAndValue(code, message, value, _id) {
  return Promise.reject(new APIError(code, [
    {
      message: parseString(LanguageInit.getMessage(message), formatNumberCurrencyVND(value)),
      param: message,
      value,
      _id
    }
  ]));
}

export function errorCheckLogin(code, message, value) {
  return Promise.reject(new APIError(code, [
    {
      message: parseString(LanguageInit.getMessage(message)),
      param: message,
      value: {
        
      }
    }
  ]));
}

export function successMessage(code, message, value) {
  return Promise.resolve((code,
    {
      message: LanguageInit.getMessage(message),
      param: message,
      value
    }
  ));
}

  export function errorMessageWithValue(code, message, value) {
    return Promise.reject(new APIError(code, [
      {
        message: LanguageInit.getMessage(message),
        param: message,
        value
      }
    ]));
  }

export function error500(error) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error 500 : ', error);
  }
  return Promise.reject(new APIError(500, [
    {
      message: LanguageInit.getErrorMessage(ERROR_CODE.INTERNAL_SERVER_ERROR),
      param: ERROR_CODE.INTERNAL_SERVER_ERROR,
    }
  ]));
}
