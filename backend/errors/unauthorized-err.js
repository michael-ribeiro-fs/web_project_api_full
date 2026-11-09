const { HTTP_STATUS } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }
}
module.exports = UnauthorizedError;
