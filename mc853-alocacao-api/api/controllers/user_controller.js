const HttpStatus = require('http-status-codes');

const logger = require('../utils/logger');

const UserDAO = require('../daos/mongodb/user_dao');
const User = require('../models/user')(UserDAO);
const ObjUtils = require('../utils/objects');

const UserController = {
  async create(request, response) {
    const {
      body: data,
    } = request;
    
    try {
      ObjUtils.DeepTrim(data);
      
      const {
        nome,
        senha,
        matricula,
        email,
        type
      } = data;

      erros = [];

      if(!nome)
        erros.push('Nome inválido');

      if(!senha)
        erros.push('Senha inválida!');
      
      if(!matricula)
        erros.push('Matricula inválida!');

      if(!email)
        erros.push('Email inválido!');

      if(erros.length > 0)
        throw new Error(erros.join(`<br/>`));
      
      let u = await User.findOne({ email });
      if(u) throw new Error('Email já cadastrado!');

      let l = await User.findOne({ matricula });
      if(l) throw new Error('Matricula já cadastrado!');

      const user = await User.create(data);

      return response.status(HttpStatus.CREATED).json({
        message: HttpStatus.getStatusText(HttpStatus.CREATED),
        user,
      });
    } catch (error) {
      logger.warn(`Error creating user. Reason: ${error.message}.`);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message
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
      const user = await UserDAO.findOneAndUpdate(id, data);
      return response.status(HttpStatus.ACCEPTED).json({
        message: HttpStatus.getStatusText(HttpStatus.ACCEPTED),
        user,
      });
    } catch (error) {
      logger.warn(`Error updating user. Reason: ${error.message}.`);
      throw new Error(error);
    }
  },

  async read(request, response, next) {
    const { userId } = request.params;

    try {
      logger.info('Reading User', { userId });
      const user = await User.findOne(userId);

      if (!user) {
        return response.status(HttpStatus.NO_CONTENT).json();
      }

      request.order = user;
      return next();
    } catch (error) {
      logger.warn(`Error reading user. Reason: ${error.message}`, { userId });
      return next(error);
    }
  },
};

module.exports = UserController;
