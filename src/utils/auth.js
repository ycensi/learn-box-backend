const config = require('../../config');
const jwt = require('jsonwebtoken');

export const validateToken = (options = {}) => {
  let {
    token
  } = options;

  return new Promise((resolve, reject) => {
    jwt.verify(token, config.privateKey, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });
}

export const createToken = (payload) => {
  return jwt.sign(payload, config.privateKey, {
    algorithm: 'HS256'
  });
};