/**
 * Express Router
 */
const InstituteRouter = require('express').Router();

/**
 * Controllers
 */
const InstituteController = require('../controllers/institute_controller');

InstituteRouter.route('/institutos').get(InstituteController.getAll);
InstituteRouter.route('/institutos').post(InstituteController.create);
InstituteRouter.route('/institutos/:id').put(InstituteController.update);
InstituteRouter.route('/instituto/:nome/salas').get(InstituteController.getSalas);

module.exports = InstituteRouter;
