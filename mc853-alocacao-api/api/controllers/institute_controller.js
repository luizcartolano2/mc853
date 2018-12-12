const HttpStatus = require('http-status-codes');

const logger = require('../utils/logger');

const InstituteDAO = require('../daos/mongodb/institute_dao');
const RoomDAO = require('../daos/mongodb/room_dao');
const Institute = require('../models/institute')(InstituteDAO);
const Room = require('../models/room')(RoomDAO);

const InstituteController = {
  async create(request, response) {
    const {
      body: data,
    } = request;

    try {
      logger.info('Creating new room');
      console.log(request.body);
      console.log(data);

      let {
        name,
        responsavel,
        cep,
        endereco,
      } = data;

      let instituto = await Institute.findOne({ name });
      if(instituto)
        throw new Error('Esse instituto já existe');

      erros = [];

      if(!name)
        erros.push('Nome de sala inválido')

      if(!cep || !cep.match(/^\d{5}-?\d{3}$/))
        erros.push('Cep inválido')

      cep = cep.replace(/\D/, '');

      if(!endereco)
        erros.push('Endereço inválido')

      if(erros.length > 0)
        throw new Error(erros.join(`<br/>`));


      const institute = await Institute.create({
        ...data,
        cep
      });

      return response.status(HttpStatus.CREATED).json({
        message: HttpStatus.getStatusText(HttpStatus.CREATED),
        institute,
      });
    } catch (error) {
      logger.warn(`Error creating institute. Reason: ${error.message}.`);
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
      const institute = await InstituteDAO.findOneAndUpdate(id, data);
      return response.status(HttpStatus.ACCEPTED).json({
        message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
        institute,
      });
    } catch (error) {
      logger.warn(`Error updating institute. Reason: ${error.message}.`);
      throw new Error(error);
    }
  },

  async getAll(request, response) {
    try{
      const institutes = await Institute.getAll();
      return response.status(HttpStatus.ACCEPTED).json({
        message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
        institutes
      });
    } catch (error) {
      logger.warn(`Erro ao buscar todos os institutos cadastrados`);
      return response.status(HttpStatus.BAD_REQUEST);
    }
  },

  async getSalas(request, response){
    try{
      const {
        body: data,
        params,
      } = request;
      const { nome } = params;
      const salas = await Room.getSalasByInstituto(nome);
      return response.status(HttpStatus.ACCEPTED).json({
        message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
        salas
      });
    } catch (error) {
      logger.warn(`Erro ao buscar salas do instituto ${nome}!`);
      return response.status(HttpStatus.BAD_REQUEST);
    }
  }
};

module.exports = InstituteController;
