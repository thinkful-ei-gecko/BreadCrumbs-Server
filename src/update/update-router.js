const express = require('express')
const path = require('path')
const UpdateService = require('./update-service')
const { requireAuth } = require("../middleware/jwt-auth");

const updateRouter = express.Router()
const jsonBodyParser = express.json()

updateRouter
  .use(requireAuth)
  .route('/')
  .all((req, res, next) => {
    const db = req.app.get('db')
    const id = req.body.id
    UpdateService.getById(db, id)
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
    res.json(UpdateService.serializeUser(res.user))
  })
  .delete((req, res, next) => {
    UpdateService.deleteUser(req.app.get('db'), req.body.id)
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
      UpdateService.updateFields(
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
    const { new_password } = req.body
    const newPassword = {new_password}
    if(!new_password) {
      next()
    }
    UpdateService.updatePassword(
      req.app.get('db'),
      res.user.id,
      newPassword
    )
    .then(numRowsAffected => {
      res.status(204).end()
    })
    .catch(next)
  })


module.exports = updateRouter