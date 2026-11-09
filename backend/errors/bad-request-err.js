const { HTTP_STATUS } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS.BAD_REQUEST;
  }
}
module.exports = BadRequestError;
