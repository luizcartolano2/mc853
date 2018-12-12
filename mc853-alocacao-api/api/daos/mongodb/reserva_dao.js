const mongoose = require('mongoose');

const MongoModel = require('./mongo_model');
const reservaSchema = require('./schemas/reserva_schema');

// Loading Model
reservaSchema.loadClass(MongoModel);
// Configuring Hooks
// reservaSchema.post('find', MongoModel.mongooseToHttp);
// reservaSchema.post('findOne', MongoModel.mongooseToHttp);

// Exporting Mongoose Model
const reserva = mongoose.model('Reserva', reservaSchema);

class ReservaMongoDAO {
  static async create(data) {
    const completeData = {
      ...data,
    };

    const answer = await reserva.create(completeData);
    return answer ? answer.toObject() : null;
  }

  static async remove(...params) {
    return reserva.remove(...params);
  }

  static async findOneAndUpdate(identifier, data) {
    const completeData = {
      ...data,
    };
    const answer = await reserva.findOneAndUpdate(identifier, completeData, { new: true });
    return answer ? answer.toObject() : null;
  }

  static async findOne(...params) {
    const answer = await reserva.findOne(...params);
    return answer ? answer.toObject() : null;
  }

  static async findByRoom({ sala, horarioInicio, horarioFim }) {
    const query = { sala };

    console.log({sala, horarioInicio, horarioFim});

    if (horarioInicio && horarioFim) {
      query.$or = [
        { $and: [
            { horarioInicio: { $lte: horarioInicio } },
            { horarioFim: { $gte: horarioInicio } }
          ]
        },
        { $and: [
            { horarioInicio: { $gte: horarioInicio } },
            { horarioFim: { $lte: horarioFim } }
        ]},
        { $and: [
            { horarioInicio: { $lte: horarioFim } },
            { horarioFim: { $gte: horarioFim } }
          ]
        }];
    }

    console.log({query});
    console.log(query.$or);

    const answer = await reserva.find(query);
    return answer.map(a => a.toObject());
  }

  static async getAll() {
    const answer = await reserva .find();
    return answer.map(a => a.toObject());
  }
}

module.exports = ReservaMongoDAO;
