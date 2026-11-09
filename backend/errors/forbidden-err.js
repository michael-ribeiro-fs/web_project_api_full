const { HTTP_STATUS } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS.FORBIDDEN;
  }
}
module.exports = ForbiddenError;
