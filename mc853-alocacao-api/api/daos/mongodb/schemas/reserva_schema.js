const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const ReservaSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
    alias: 'uid',
  },
  sala: {
    type: String,
  },
  responsavel: {
    type: String,
  },
  matriculaResponsavel: {
    type: String,
  },
  horarioInicio: {
    type: Date,
  },
  horarioFim: {
    type: Date,
  },
  comentarios: {
    type: String,
  },
  externo: {
    type: Boolean,
  },
});

module.exports = ReservaSchema;
