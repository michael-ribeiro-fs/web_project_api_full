const { isCelebrateError } = require('celebrate');
const { HTTP_STATUS } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body')
      || err.details.get('params')
      || err.details.get('headers')
      || err.details.get('query');

    const message = errorBody ? errorBody.message : 'Dados inválidos';
    return res.status(HTTP_STATUS.BAD_REQUEST).send({ message });
  }

  if (err.name === 'CastError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'ID inválido' });
  }

  if (err.name === 'ValidationError') {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ message: 'Dados inválidos' });
  }

  const { statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, message } = err;

  return res.status(statusCode).send({
    message:
      statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? 'Ocorreu um erro no servidor'
        : message,
  });
};
