/**
 * Express Router
 */
const AuthRouter = require('express').Router();

/**
 * Controllers
 */
const AuthController = require('../controllers/auth_controller');

AuthRouter.route('/auth')
  .get(AuthController.test)
  .post(AuthController.login);


module.exports = AuthRouter;
