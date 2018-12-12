/**
 * Express Router
 */
const RoomRouter = require('express').Router();

/**
 * Controllers
 */
const RoomController = require('../controllers/room_controller');

RoomRouter.route('/salas').post(RoomController.create);
RoomRouter.route('/salas/:id').put(RoomController.update);

module.exports = RoomRouter;
