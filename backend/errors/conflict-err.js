const { HTTP_STATUS } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS.CONFLICT;
  }
}
module.exports = ConflictError;
