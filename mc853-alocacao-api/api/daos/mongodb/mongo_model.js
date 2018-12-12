const HttpStatus = require('http-status-codes');

const constants = require('../../utils/constants');
const logger = require('../../utils/logger');

const protectedKeys = ['_id'];

class MongoModel {
  toJSON() {
    const mask = Object.assign({}, this.toObject(), {
      uid: this.id,
    });

    protectedKeys.forEach((key) => {
      delete mask[key];
    });

    return mask;
  }

  /**
   *
   * @static
   * @param {String} uid
   * @param {Object} update
   * @returns Updated Object
   * @memberof Model
   */
  static completeUpdate(uid, update) {
    return this.findByIdAndUpdate(uid, update, {
      new: true,
      runValidators: true,
    });
  }

  /**
    * Mongoose middleware to parse mongoose errors into http style errors
    *
    * @static
  */
  static mongooseToHttp(error, document, next) {
    // parse mongoose errror
    const httpError = new Error();
    const { errors } = error;
    const message = [];
    logger.warn(`mongoose error: ${JSON.stringify(error, null, 2)}`);

    switch (error.name) {
      case constants.MONGOOSE_VALIDATION_ERROR: {
        Object.keys(errors).forEach((key) => {
          message.push(errors[key].message);
        });

        httpError.message = message.join(' ');
        httpError.status = HttpStatus.BAD_REQUEST;

        break;
      }
      case constants.MONGOOSE_MONGO_ERROR: {
        httpError.message = error.message;
        httpError.status = HttpStatus.BAD_REQUEST;
        break;
      }
      case constants.MONGOOSE_CAST_ERROR: {
        if (error.message.includes(constants.CAST_OBJECT_ERROR)) {
          httpError.message = constants.MALFORMED_UID_FIELD;
        } else {
          httpError.message = error.message;
        }

        httpError.status = HttpStatus.BAD_REQUEST;
        break;
      }
      default: {
        httpError.message = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
        httpError.status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      }
    }

    return next(httpError);
  }
}

module.exports = MongoModel;
