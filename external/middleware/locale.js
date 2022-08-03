import { LANGUAGE_DEFAULT } from '../constants/constants';

export const LanguageInit = (req, res, next) => {
  const language = req.headers['Accept-Language'] || req.headers.lang;
  if (!language) {
    req.headers.lang = LANGUAGE_DEFAULT;
  }
  return next();
}
