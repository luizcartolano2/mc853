const config = require('config');
const logger = require('./api/utils/logger');
const ApiService = require('./api/services/api');

const apiService = new ApiService();

ApiService.connect()
  .then(() => apiService.app.listen(config.get('port'), () => {
    logger.info(`Server successfully started on port: ${config.get('port')}`);
  }))
  .catch((error) => {
    logger.info(`Error starting Express App. Reason: ${error.message}`);
    process.exit(1);
  });

