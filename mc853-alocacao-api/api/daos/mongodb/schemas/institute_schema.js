const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const InstituteSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
    alias: 'uid',
  },
  name: {
    type: String,
    required: true,
  },
  cep: {
    type: Number,
    default: 0.0,
    required: false,
  },
  endereco: {
    type: String,
    required: false,
  },
  responsavel: {
    type: String,
    required: false,
  },
});

module.exports = InstituteSchema;
