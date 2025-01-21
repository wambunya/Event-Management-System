class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    const { statusCode = 500, message, isOperational } = err;
  
    res.status(statusCode).json({
      status: isOperational ? "fail" : "error",
      message: message || "Internal Server Error",
    });
  };
  
  module.exports = { AppError, errorHandler };
  