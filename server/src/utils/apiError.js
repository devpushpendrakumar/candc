class ApiError extends Error {
  constructor(
    message,
    statusCode = 500,
    errors = [],
    stack = "",
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
