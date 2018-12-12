const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
    alias: 'uid',
  },
  matricula: {
    type: String,
    default: 0.0,
    index: { unique: true },
    maxlength: 12,
    required: false,
  },
  senha: {
    type: String,
    required: true,
    maxlength: 20,
  },
  nome: {
    type: String,
    default: '',
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = UserSchema;
