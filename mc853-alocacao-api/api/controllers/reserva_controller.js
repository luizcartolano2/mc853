const HttpStatus = require('http-status-codes');

const logger = require('../utils/logger');

const ReservaDAO = require('../daos/mongodb/reserva_dao');
const Reserva = require('../models/reserva')(ReservaDAO);

const ReservaController = {
  async create(request, response) {
    const {
      body: data,
    } = request;

    try {
      const reserva = await Reserva.create(data);

      return response.status(HttpStatus.CREATED).json({
        message: HttpStatus.getStatusText(HttpStatus.CREATED),
        reserva,
      });
    } catch (error) {
      logger.warn(`Error creating reserva. Reason: ${error.message}.`);
      return response.status(HttpStatus.CONFLICT).json({
        message: `Error creating reserva. Reason: ${error.message}`,
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
      const reserva = await ReservaDAO.findOneAndUpdate(id, data);
      return response.status(HttpStatus.ACCEPTED).json({
        message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
        reserva,
      });
    } catch (error) {
      logger.warn(`Error updating reserva. Reason: ${error.message}.`);
      throw new Error(error);
    }
  },

  async read(request, response, next) {
    const { reservaId } = request.params;

    try {
      logger.info('Reading Reserva ', { reservaId });
      const reserva = await Reserva.findOne(reservaId);

      if (!reserva) {
        return response.status(HttpStatus.NO_CONTENT).json();
      }

      request.order = reserva;
      return next();
    } catch (error) {
      logger.warn(`Error reading reserva. Reason: ${error.message}`, { reservaId });
      return next(error);
    }
  },

  async readSala(request, response) {
    const { params, query } = request;
    const data = { ...params, ...query };

    const reservas = await Reserva.findByRoom(data);

    return response.status(HttpStatus.ACCEPTED).json({
      message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
      reservas,
    });
  },

  async getAll(request, response){
    const reservas = await Reserva.getAll()

    return response.status(HttpStatus.ACCEPTED).json({
      message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
      reservas,
    });
  },

  async findByMatricula(request, response) {
    console.log(data);
    const {
      body: data,
      params
    } = request;

    data = { ...data, params };


    const reservas = await Reserva.findByMatricula();
  }

};

module.exports = ReservaController;
