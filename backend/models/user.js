const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); // Importe o bcrypt aqui

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'O e-mail inserido é inválido',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // O hash da senha não será retornado por padrão
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1600451526.jpg',
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]+#?$/.test(
          v,
        );
      },
      message: 'O link do avatar é inválido',
    },
  },
});

// MÉTODO ESTÁTICO PARA AUTENTICAÇÃO
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('E-mail ou senha incorretos'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('E-mail ou senha incorretos'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
