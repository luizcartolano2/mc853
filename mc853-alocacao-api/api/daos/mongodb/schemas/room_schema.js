const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const RoomSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
    alias: 'uid',
  },
  capacidade: {
    type: Number,
  },
  cep: {
    type: Number,
    default: 0.0,
  },
  endereco: {
    type: String,
  },
  nome: {
    type: String,
  },
  instituto: {
    type: String,
  },
  arCondicionado: {
    type: Boolean,
  },
  acessibilidade: {
    type: Boolean,
  },
  projetor: {
    type: Boolean,
  },
  dias: {
    type: Array,
  },
  complemento: {
    type: String,
    required: false,
  },
  comentarios: {
    type: String,
    required: false,
  },
});

module.exports = RoomSchema;
