/**
 * Express Router
 */
const PedidoReservaRouter = require('express').Router();

/**
 * Controllers
 */
const PedidoReservaController = require('../controllers/pedidoReserva_controller');

PedidoReservaRouter.route('/pedido-reservas').get(PedidoReservaController.getAll);
PedidoReservaRouter.route('/pedido-reservas').post(PedidoReservaController.create);
PedidoReservaRouter.route('/pedido-reservas/:id').put(PedidoReservaController.update);
PedidoReservaRouter.route('/pedido-reservas/:sala').get(PedidoReservaController.readSala);
PedidoReservaRouter.route('/pedido-reservas/matricula/:matricula').get(PedidoReservaController.findByMatricula);
PedidoReservaRouter.route('/confirma-reserva/:id').get(PedidoReservaController.confirmaReserva);
PedidoReservaRouter.route('/confirma-reserva/:id').delete(PedidoReservaController.recusaReserva);
PedidoReservaRouter.route('/pedido/:id').get(PedidoReservaController.read);

module.exports = PedidoReservaRouter;
