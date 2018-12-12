const mongoose = require('mongoose');

const MongoModel = require('./mongo_model');
const pedidoReservaSchema = require('./schemas/pedidoReserva_schema');

// Loading Model
pedidoReservaSchema.loadClass(MongoModel);
// Configuring Hooks
// reservaSchema.post('find', MongoModel.mongooseToHttp);
// reservaSchema.post('findOne', MongoModel.mongooseToHttp);

// Exporting Mongoose Model
const pedido = mongoose.model('PedidoReserva', pedidoReservaSchema);

class PedidoReservaMongoDAO {
  static async create(data) {
    const completeData = {
      ...data,
    };

    const answer = await pedido.create(completeData);
    return answer ? answer.toObject() : null;
  }

  static async remove(...params) {
    return pedido.remove(...params);
  }

  static async findOneAndUpdate(identifier, data) {
    const completeData = {
      ...data,
    };
    const answer = await pedido.findOneAndUpdate(identifier, completeData, { new: true });
    return answer ? answer.toObject() : null;
  }

  static async findOne(...params) {
    console.log('paramss -> ', params);
    const answer = await pedido.findOne(...params);
    return answer ? answer.toObject() : null;
  }

  static async findByRoom({ sala, horarioInicio, horarioFim, matriculaResponsavel }) {
    const query = { sala, matriculaResponsavel };

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

    const answer = await pedido.find(query);
    return answer.map(a => a.toObject());
  }

  static async getAll() {
    const answer = await pedido.find();
    return answer.map(a => a.toObject());
  }
}

module.exports = PedidoReservaMongoDAO;
