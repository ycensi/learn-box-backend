const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const models = require('../../models');

import {
  createToken
} from '../../utils/auth';

export const signup = (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password);
  req.body.password = hash;
  models.User.create(req.body)
    .then(user => {

      var {
        id,
        name,
        username,
        email,
        location
      } = user;

      const token = createToken({
        username,
        email,
        location
      });
      res.json({
        id,
        username,
        name,
        email,
        location,
        token
      });
    })
    .catch(err => next(Object.assign({}, err, {
      status: 401
    })));
};

export const login = (req, res, next) => {
  passport.authenticate('local', function authenticateByLocal(err, user, ex) {
    if (err) {
      console.log('erro', err);
      next(new Error('Usuário ou senha inválidos'));
    } else {
      if (ex) {
        next(ex);
      } else {
        const token = createToken(user);
        user.token = token;
        res.json(user);
      }
    }
  })(req, res);
};