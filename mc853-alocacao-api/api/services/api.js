/**
 * Modules
 */
const HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser');
const session = require('express-session')
const mongoose = require('mongoose');
const express = require('express');
const uuid = require('node-uuid');
const config = require('config');
const helmet = require('helmet');
const cors = require('cors');

const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/**
 * Logging
 */
const { createNamespace } = require('cls-hooked'); // eslint-disable prefer-destructuring
const logger = require('../utils/logger');

/**
 * Middlewares
 */
// onst authMiddleware = require('../middlewares/authorization_middleware');


/**
 * Routers
 */
// const AuthRoute = require('../routers/auth_router');
const SampleRoute = require('../routers/sample_router');
const RoomRoute = require('../routers/room_router');
const InstituteRoute = require('../routers/institute_router');
const UserRoute = require('../routers/user_router');
const AuthRoute = require('../routers/auth_router');
const ReservaRoute = require('../routers/reserva_router');
const PedidoReservaRoute = require('../routers/pedidoReserva_router');

const requestSpace = createNamespace('RequestNamespace');

/**
 * Passport configuration
 */
function validateUser(username, password) {
  logger.info('Validating:;', username, password);
  const test = {
    ra: 123456,
    password: 'pass',
  };
  return test;
}

passport.use(new LocalStrategy(
  { usernameField: 'user' },
  (username, password, done) => {
    console.log('Inside local strategy callback');
    // here is where you make a call to the database
    // to find the user based on their username or email address
    // for now, we'll just pretend we found that it was users[0]
    const user = validateUser(username, password);
    if (username === user.ra && password === user.password) {
      console.log('Local strategy returned true');
      return done(null, user);
    }
  },
));

passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  const user = users[0].id === id ? users[0] : false;
  done(null, true);
});

class APIService {
  constructor() {
    this._app = express();
    this._app.use(cors());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this._app.use(bodyParser.json());
    // this._app.use(helmet());
    // this._app.use(APIService.setReqId);
    this._app.use(cors(config.get('cors')));

    this.enableMiddlewares();
    this.createUnlockedRoutes();
    // this.createLockedRoutes();

    // this._app.use(APIService.errorHandler);
  }

  createUnlockedRoutes() {
    this._app.use(SampleRoute);
    this._app.use(RoomRoute);
    this._app.use(InstituteRoute);
    this._app.use(UserRoute);
    this._app.use(ReservaRoute);
    this._app.use(PedidoReservaRoute);
    this._app.use(AuthRoute);
  }

  enableMiddlewares() {
    // Session middleware
    this.app.use(session({
      genid: (req) => {
        console.log('Inside session middleware genid function');
        console.log(`Request object sessionID from client: ${req.sessionID}`);
        return uuid.v1(); // use UUIDs for session IDs
      },
      store: new FileStore(),
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
    }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  get app() {
    return this._app;
  }

  static setReqId(request, response, next) {
    requestSpace.run(() => {
      requestSpace.set('reqId', uuid.v1());
      next();
    });
  }

  /* eslint-disable no-unused-vars */
  static errorHandler(error, request, response, next) {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
    logger.error(`${error.status || 500} - ${error.message} - ${request.originalUrl} - ${request.method} - ${request.ip}`);
    return response.status(status).json({
      status,
      message,
    });
  }
  /* eslint-enable no-unused-vars */
  static async connect() {
    logger.info('Connecting');
    mongoose.Promise = global.Promise;

    try {
      await mongoose.connect(
        `mongodb://${config.get('mongo.url')}`,
        {
          connectTimeoutMS: config.get('mongo.timeout'),
        },
      );

      logger.info('Successfully connected to Mongo database');
    } catch (error) {
      logger.error(`Error connecting to MongoDB: ${error}`);
      throw error;
    }
  }
}

module.exports = APIService;
