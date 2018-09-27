const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const passportLocal = require('passport-local');
const models = require('../models');

const LocalStrategy = passportLocal.Strategy;

export default () => {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      models.User.findOne({
          where: {
            username
          },
          attributes: ['id', 'email', 'password', 'name', 'location']
        })
        .then(user => {
          if (user) {
            const valid = bcrypt.compareSync(password, user.password);
            if (!valid) {
              return done(null, false, {
                message: 'Incorrect password.'
              });
            }

            const {
              id,
              name,
              location,
              email,
            } = user;

            return done(null, {
              id,
              name,
              location,
              email,
              username
            });
          } else {
            return done(null, false, {
              message: 'Incorrect username.'
            });
          }
        })
        .catch(err => done(err));
    }
  ));
};