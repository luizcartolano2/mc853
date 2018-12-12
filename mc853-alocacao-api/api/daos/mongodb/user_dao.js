const mongoose = require('mongoose');

const MongoModel = require('./mongo_model');
const userSchema = require('./schemas/user_schema');

// Loading Model
userSchema.loadClass(MongoModel);
// Configuring Hooks
userSchema.post('find', MongoModel.mongooseToHttp);
userSchema.post('findOne', MongoModel.mongooseToHttp);

// Exporting Mongoose Model
const user = mongoose.model('User', userSchema);

class UserMongoDAO {
  static async create(data) {
    const completeData = {
      ...data,
    };
    const answer = await user.create(completeData);
    return answer ? answer.toObject() : null;
  }

  static async remove(...params) {
    return user.remove(...params);
  }

  static async findOneAndUpdate(identifier, data) {
    const completeData = {
      ...data,
    };
    const answer = await user.findOneAndUpdate(identifier, completeData, { new: true });
    return answer ? answer.toObject() : null;
  }

  static async findOne(...params) {
    const answer = await user.findOne(...params);
    return answer ? answer.toObject() : null;
  }
}

module.exports = UserMongoDAO;
