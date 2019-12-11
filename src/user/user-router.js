const express = require('express')
const path = require('path')
const UserService = require('./user-service')
const { requireAuth } = require("../middleware/jwt-auth");

const userRouter = express.Router()
const jsonBodyParser = express.json()

userRouter
  .post('/', jsonBodyParser, async (req, res, next) => {
    const { password, username, name } = req.body

    for (const field of ['name', 'username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    try {
      const passwordError = UserService.validatePassword(password)

      if (passwordError)
        return res.status(400).json({ error: passwordError })

      const hasUserWithUserName = await UserService.hasUserWithUserName(
        req.app.get('db'),
        username
      )

      if (hasUserWithUserName)
        return res.status(400).json({ error: `Username already taken` })

      const hashedPassword = await  UserService.hashPassword(password)

      const newUser = {
        username,
        password: hashedPassword,
        name,
      }

      const user = await UserService.insertUser(
        req.app.get('db'),
        newUser
      )

      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${user.id}`))
        .json(UserService.serializeUser(user))
    } catch(error) {
      next(error)
    }
  })

  .put(requireAuth, (req, res) => {
    const sub = req.user.username;
    const payload = {
      user_id: req.user.id,
      name: req.user.name
    };
    res.send({
      authToken: AuthService.createJwt(sub, payload)
    });
  })

userRouter
  .route('/update')
  .all((req, res, next) => {
    const db = req.app.get('db')
    const id = req.body.id
    UserService.getById(db, id)
      .then(user => {
        if(!user) {
          return res.status(404).json({error: {message: `User does not exist`}})
        }
        res.user = user
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(UserService.serializeUser(res.user))
  })
  .delete((req, res, next) => {
    UserService.deleteUser(req.app.get('db'), req.body.id)
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { name, username, password } = req.body
    if(req.body.new_password){
      next()
    }
    if(password !== user.password) {
      res.status(404).send(`Incorrect password`)
    }
    const updateFields = { name, username, password }
    const numberOfValues = Object.values(updateFields).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'name', 'password' or 'username'`
        }
      })
      UserService.updateFields(
        req.app.get('db'),
        res.user.id,
        updateFields
      )
      .then(numRowsAffected => {
        res.status(204).end()
      })
    .catch(next)
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { new_password } = req.body;
    const newPassword = {new_password};
    if(!new_password) {
      next();
    }
    UserService.updatePassword(
      req.app.get('db'),
      res.user.id,
      newPassword
    )
    .then(numRowsAffected => {
      res.status(204).end();
    })
    .catch(next)
  })


module.exports = userRouter