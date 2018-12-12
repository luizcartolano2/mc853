/**
 * Express Router
 */
const ReservaRouter = require('express').Router();

/**
 * Controllers
 */
const ReservaController = require('../controllers/reserva_controller');

ReservaRouter.route('/reservas').get(ReservaController.getAll);
ReservaRouter.route('/reservas').post(ReservaController.create);
ReservaRouter.route('/reservas/:id').put(ReservaController.update);
ReservaRouter.route('/reservas/:sala').get(ReservaController.readSala);
ReservaRouter.route('/reservas/matricula/:matricula').get(ReservaController.findByMatricula);

module.exports = ReservaRouter;
