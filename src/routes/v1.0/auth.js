const passport = require("passport");
const bcrypt = require("bcrypt-nodejs");
const models = require("../../models");

import { createToken } from "../../utils/auth";

export const signup = (req, res, next) => {
  const userToCreate = req.body;

  const hash = bcrypt.hashSync(userToCreate.password);
  userToCreate.role = "student";
  userToCreate.active = true;
  userToCreate.password = hash;

  models.User.create(userToCreate)
    .then(user => {
      var { id, name, username, role } = user;

      const token = createToken({
        username,
        role
      });
      res.json({
        id,
        username,
        name,
        token
      });
    })
    .catch(err => {
      console.error(err);
      next(
        Object.assign({}, userToCreate, err, {
          status: 401
        })
      );
    });
};

export const login = (req, res, next) => {
  passport.authenticate("local", function authenticateByLocal(err, user, ex) {
    if (err) {
      console.log("erro", err);
      next(new Error("Usuário ou senha inválidos"));
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
