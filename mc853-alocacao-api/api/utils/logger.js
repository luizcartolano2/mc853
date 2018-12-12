const { getNamespace } = require('cls-hooked');
const winston = require('winston');

function appendReqId(args) {
  const requestNameSpace = getNamespace('RequestNamespace');
  let formatedMessage;
  if (requestNameSpace && requestNameSpace.get('reqId')) {
    formatedMessage = `REQID=${requestNameSpace.get('reqId')} ${args.message}`;
  } else {
    formatedMessage = args.message;
  }
  formatedMessage = `${new Date().toISOString()} ${formatedMessage}`;
  return formatedMessage;
}
const options = {
  console: {
    formatter: appendReqId,
    level: 'debug',
    handleExceptions: true,
    colorize: true,
    json: false,
  },
};

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
