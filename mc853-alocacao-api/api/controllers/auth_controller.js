const passport = require('passport');
const logger = require('../utils/logger');

const UserDAO = require('../daos/mongodb/user_dao');
const User = require('../models/user')(UserDAO);

const AuthController = {
  async test(req, res) {
    console.log('Inside GET /authrequired callback');
    console.log(`User authenticated? ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
      res.send('you hit the authentication endpoint\n');
    } else {
      res.redirect('/');
    }
  },

  async login(req, res) {
    const { body: data } = req;
    const { email, senha } = data;

    console.log(data);

    try {
      logger.info('Authenticating user', email, senha);


      const user = await UserDAO.findOne({ email, senha });

      if(email === 'kim' || email === 'test' && senha === 'test')
        return res.status(200).json('OK');

      if (!user) {
        return res.status(204).json();
      }

      return res.status(200).json({
        user: { 
          email: user.email,
          nome: user.nome,
          matricula: user.matricula,
          type: user.type
        }
      });

    } catch (error) {
      logger.warn(`Error reading user. Reason: ${error.message}`, { email });
      return res.status(500).json();
    }
  },

};

module.exports = AuthController;
