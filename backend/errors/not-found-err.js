const { HTTP_STATUS } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS.NOT_FOUND;
  }
}
module.exports = NotFoundError;
