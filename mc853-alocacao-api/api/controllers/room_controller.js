const HttpStatus = require('http-status-codes');

const logger = require('../utils/logger');

const RoomDAO = require('../daos/mongodb/room_dao');
const Room = require('../models/room')(RoomDAO);
const InstituteDAO = require('../daos/mongodb/institute_dao');
const Institute = require('../models/institute')(InstituteDAO);
const ObjUtils = require('../utils/objects');

const RoomController = {
  async create(request, response) {
    const {
      body: data,
    } = request;

    try {
      logger.info('Creating new room');
      console.log(request.body);

      ObjUtils.DeepTrim(data);
      console.log(data);

      let {
        nome,
        instituto,
        capacidade,
        caracteristicas,
        dias,
        cep,
        endereco,
      } = data;

      let sala = await Room.findOne({ nome });
      if(sala)
        throw new Error('Essa sala já existe.');

      institutos = await Institute.getAll();
      institutos = institutos.map(i => i.name);

      console.log({institutos});

      erros = [];

      if(!nome)
        erros.push('Nome de sala inválido')

      if(!instituto || !institutos.includes(instituto))
       erros.push('Instituto inválido')

      if(!capacidade || isNaN(capacidade) || capacidade < 0)
        erros.push('Capacidade inválida')

      if(!dias || dias.length == 0)
        erros.push('Dias disponíveis inválidos')

      if(!cep || !cep.match(/^\d{5}-?\d{3}$/))
        erros.push('Cep inválido')

      cep = cep.replace(/\D/, '');

      if(!endereco)
        erros.push('Endereço inválido')

      if(erros.length > 0)
        throw new Error(erros.join(`<br/>`));

      for(c of caracteristicas)
        data[c] = true;

      const room = await Room.create({
        ...data,
        cep
      });

      return response.status(HttpStatus.CREATED).json({
        message: HttpStatus.getStatusText(HttpStatus.CREATED),
        room,
      });

    } catch (error) {
      logger.warn(`Error creating room. Reason: ${error.message}.`);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `${error.message}`,
      });
    }
  },

  async test(request, response) {
    response.send('OK');
    logger.info('Sample controller!');
  },

  async update(request, response) {
    const {
      body: data,
      params,
    } = request;
    const { id } = params;

    try {
      const room = await RoomDAO.findOneAndUpdate(id, data);
      return response.status(HttpStatus.ACCEPTED).json({
        message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
        room,
      });
    } catch (error) {
      logger.warn(`Error updating room. Reason: ${error.message}.`);
      throw new Error(error);
    }
  },
};

module.exports = RoomController;
