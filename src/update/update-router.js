const express = require("express");
const xss = require("xss");
const UpdateService = require("./update-service");
const AuthService = require("../auth/auth-service");
const UserService = require("../user/user-service");
const { requireAuth } = require("../middleware/jwt-auth");

const updateRouter = express.Router();
const jsonBodyParser = express.json();

updateRouter
  .use(requireAuth)
  .route("/")
  .all(jsonBodyParser, (req, res, next) => {
    const { user_id } = req.body;
    const db = req.app.get("db");
    const id = user_id;
    
    UpdateService.getById(db, id)
      .then(user => {
        if (!user) {
          return res
            .status(404)
            .json({ error: { message: `User does not exist` } });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(UpdateService.serializeUser(res.user));
  })
  .delete(jsonBodyParser, (req, res, next) => {
    UpdateService.deleteUser(req.app.get("db"), req.user.id) 
      .then(numRowsAffected => {
        return res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonBodyParser, async (req, res, next) => {
    let { name, username, password } = req.body;

    name = xss(name);
    username = xss(username);
    password = xss(password);

    const hasUserWithUserName = await UserService.hasUserWithUserName(
      req.app.get('db'),
      username
    );

    if (hasUserWithUserName)
      return res.status(400).json({ error: `Username already taken` })

    const compareMatch = await AuthService.comparePasswords(
      password,
      res.user[0].password
    );

    if (!compareMatch)
      res.status(404).send(`Incorrect password`);

    const updateFields = { name, username };
    const numberOfValues = Object.values(updateFields).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'name' or 'username'`
        }
      });

    UpdateService.updateFields(req.app.get("db"), res.user[0].id, updateFields)
      .then(numRowsAffected => {
        return res.status(204).end();
      })
      .catch(next);
  });

updateRouter
  .use(requireAuth)
  .route("/password")
  .all(jsonBodyParser, (req, res, next) => {
    const { user_id } = req.body;
    const db = req.app.get("db");
    const id = user_id;

    UpdateService.getById(db, id)
      .then(user => {
        if (!user) {
          return res
            .status(404)
            .json({ error: { message: `User does not exist` } });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(UpdateService.serializeUser(res.user));
  })
  .patch(jsonBodyParser, async (req, res, next) => {
    let { password, new_password } = req.body;

    password = xss(password);
    new_password = xss(new_password);

    const compareMatch = await AuthService.comparePasswords(
      password,
      res.user[0].password
    );

    if (!compareMatch) {
      res.status(404).send(`Incorrect password`);
    }

    const passwordError = UserService.validatePassword(new_password);

    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }

    const newPassword = await AuthService.hashPassword(new_password);

    UpdateService.updatePassword(req.app.get("db"), res.user[0].id, newPassword)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = updateRouter;
