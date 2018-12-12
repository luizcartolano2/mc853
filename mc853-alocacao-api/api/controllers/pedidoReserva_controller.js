const HttpStatus = require('http-status-codes');

const logger = require('../utils/logger');

const PedidoReservaDAO = require('../daos/mongodb/pedidoreserva_dao');
const ReservaDAO = require('../daos/mongodb/reserva_dao');
const Reserva = require('../models/reserva')(ReservaDAO);
const PedidoReserva = require('../models/pedidoReserva')(PedidoReservaDAO, Reserva);

const PedidoReservaController = {
  async create(request, response) {
    const {
      body: data,
    } = request;

    try {
      const pedido = await PedidoReserva.create(data);

      return response.status(HttpStatus.CREATED).json({
        message: HttpStatus.getStatusText(HttpStatus.CREATED),
        pedido,
      });
    } catch (error) {
      logger.warn(`Error creating pedido de reserva. Reason: ${error.message}.`);
      return response.status(HttpStatus.CONFLICT).json({
        message: error.message,
      });
    }
  },

  async update(request, response) {
    const {
      body: data,
      params,
    } = request;
    const { id } = params;

    try {
      const pedido = await PedidoReservaDAO.findOneAndUpdate(id, data);
      return response.status(HttpStatus.ACCEPTED).json({
        message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
        pedido,
      });
    } catch (error) {
      logger.warn(`Error updating pedido. Reason: ${error.message}.`);
      throw new Error(error);
    }
  },

  async read(request, response, next) {
    const { id } = request.params;

    try {
      logger.info('Reading Reserva ', { id });
      const pedido = await PedidoReserva.findOne(id);

      if (!pedido) {
        return response.status(HttpStatus.NO_CONTENT).json();
      }

      request.order = pedido;
      return next();
    } catch (error) {
      logger.warn(`Error reading pedido. Reason: ${error.message}`, { id });
      return next(error);
    }
  },

  async readSala(request, response) {
    const { params, query } = request;
    const data = { ...params, ...query };

    const pedidos = await PedidoReserva.findByRoom(data);

    return response.status(HttpStatus.ACCEPTED).json({
      message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
      pedidos,
    });
  },

  async getAll(request, response){
    const pedidos = await PedidoReserva.getAll()

    return response.status(HttpStatus.ACCEPTED).json({
      message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
      pedidos,
    });
  },

  async findByMatricula(request, response) {
    const {
      body: data,
      params
    } = request;

    data = { ...data, params };

    const pedidos = await PedidoReserva.findByMatricula();
  },

  async confirmaReserva(request, response){
    const {
      body: data,
      params
    } = request;

    try{
      let { id } = { ...data, ...params };
      await PedidoReserva.confirmaReserva(id)

      return response.status(HttpStatus.ACCEPTED).json({
        message: 'ARRR'
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      })
    }
  },

  async recusaReserva(request, response){
    const {
      body: data,
      params
    } = request;

    try{
      let { id } = { ...data, ...params };
      await PedidoReserva.recusaReserva(id)

      return response.status(HttpStatus.ACCEPTED).json({
        message: 'ARRR'
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message
      })
    }
  }

};

module.exports = PedidoReservaController;
