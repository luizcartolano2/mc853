const passport = require('passport');
const logger = require('../utils/logger');

const SampleController = {
  async test(request, response) {
    response.send('OK');
    logger.info('Sample controller!');
    logger.info(request.sessionId);
  },

  async login(req, res, next) {
    logger.info('Inside POST /login callback');
    passport.authenticate('local', (err, user, info) => {
      logger.info('Inside passport.authenticate() callback');
      logger.info(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
      logger.info(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, (err) => {
        logger.info('Inside req.login() callback');
        logger.info(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
        logger.info(`req.user: ${JSON.stringify(req.user)}`);
        return res.send('You were authenticated & logged in!\n');
      });
    })(req, res, next);
  },
};

module.exports = SampleController;
