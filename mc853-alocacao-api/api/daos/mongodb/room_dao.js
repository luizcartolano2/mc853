const mongoose = require('mongoose');

const MongoModel = require('./mongo_model');
const roomSchema = require('./schemas/room_schema');

// Loading Model
roomSchema.loadClass(MongoModel);
// Configuring Hooks
// roomSchema.post('find', MongoModel.mongooseToHttp);
// roomSchema.post('findOne', MongoModel.mongooseToHttp);

// Exporting Mongoose Model
const room = mongoose.model('Room', roomSchema);

class RoomMongoDAO {
  static async create(data) {
    const completeData = {
      ...data,
    };

    const answer = await room.create(completeData);
    return answer ? answer.toObject() : null;
  }

  static async remove(...params) {
    return room.remove(...params);
  }

  static async findOneAndUpdate(identifier, data) {
    const completeData = {
      ...data,
    };
    const answer = await room.findOneAndUpdate(identifier, completeData, { new: true });
    return answer ? answer.toObject() : null;
  }

  static async findOne(...params) {
    const answer = await room.findOne(...params);
    return answer ? answer.toObject() : null;
  }

  static async getSalasByInstituto(instituto) {
    const answer = await room.find({ instituto });
    return answer.map(a => a.toObject());
  }
}

module.exports = RoomMongoDAO;
