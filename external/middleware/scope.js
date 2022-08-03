class APIError extends Error {
  constructor(statusCode, errors, ...args) {
    super(...args);
    Error.captureStackTrace(this, APIError);
    this.statusCode = statusCode;
    if (typeof errors === 'string') {
      this.message = errors;
    } else {
      this.errors = errors;
    }
  }
}


export function addScope(scope) {
  return async (req, res, next) => {
    req.scope = scope;
    next();
  };
}

export function checkScope(req, res, next) {
  if (req.user.isRoot) {
    return next();
  }
  if (!req.user.scopes || !req.user.scopes.hasOwnProperty(req.scope)
    || !req.user.scopes[req.scope].indexOf(req.method.toLocaleUpperCase())) {
    return next(new APIError(401, 'Unauthorized'));
  }
  return next()
}
