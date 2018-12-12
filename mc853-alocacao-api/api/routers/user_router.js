/**
 * Express Router
 */
const UserRouter = require('express').Router();

/**
 * Controllers
 */
const UserController = require('../controllers/user_controller');

UserRouter.route('/usuarios').post(UserController.create);
UserRouter.route('/usuarios/:id').put(UserController.update);

module.exports = UserRouter;