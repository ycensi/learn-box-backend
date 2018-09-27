import {
  validateToken
} from '../utils/auth';
import config from '../../config';

export const authenticate = (req, res, next) => {
  let token = req.get('Authorization');
  token = token.split('Bearer ')[1];

  if (token) {
    validateToken({
        token
      })
      .then(payload => {
        req.user = payload;
        next();
      })
      .catch(err => next(err));
  } else {
    next(new Error('No Token'));
  }
};

export const paginate = (req, res, next) => {
  req.page = Number(req.query['x-page']) || 0;
  req.pageSize =
    Number(req.query['x-page-size']) || config.pagination.pageSize;
  next();
};

export const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}