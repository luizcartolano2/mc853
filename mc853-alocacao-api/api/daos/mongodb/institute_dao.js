const mongoose = require('mongoose');

const MongoModel = require('./mongo_model');
const instituteSchema = require('./schemas/institute_schema');
const logger = require('../../utils/logger');

// Loading Model
instituteSchema.loadClass(MongoModel);
// Configuring Hooks
// instituteSchema.post('find', MongoModel.mongooseToHttp);
// instituteSchema.post('findOne', MongoModel.mongooseToHttp);

// Exporting Mongoose Model
const institute = mongoose.model('Institute', instituteSchema);

class InstituteMongoDAO {
  static async create(data) {
    const completeData = {
      ...data,
    };
    logger.debug(data);
    logger.debug('before await institute create');
    const answer = await institute.create(completeData);
    logger.debug('after await institute create');
    return answer ? answer.toObject() : null;
  }

  static async remove(...params) {
    return institute.remove(...params);
  }

  static async findOneAndUpdate(identifier, data) {
    const completeData = {
      ...data,
    };
    const answer = await institute.findOneAndUpdate(identifier, completeData, { new: true });
    return answer ? answer.toObject() : null;
  }

  static async findOne(...params) {
    const answer = await institute.findOne(...params);
    return answer ? answer.toObject() : null;
  }

  static async getAll() {
    const answer = await institute.find();
    return answer.map(a => a.toObject());
  }
}

module.exports = InstituteMongoDAO;
