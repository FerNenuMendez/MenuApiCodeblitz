import logger from "./logger.js";

export function manejoDeErrores(error, req, res, next) {
  let statusCode;
  let errorMessage;

  switch (error.status) {
    case 400:
      statusCode = 400;
      errorMessage = "Bad Request";
      break;
    case 401:
      statusCode = 401;
      errorMessage = "Unauthorized";
      break;
    case 404:
      statusCode = 404;
      errorMessage = "Not Found";
      break;
    case 407:
      statusCode = 407;
      errorMessage = "Authentication Required";
      break;
    case 408:
      statusCode = 408;
      errorMessage = "Request Timeout";
      break;
    case 500:
      statusCode = 500;
      errorMessage = "Internal Server Error";
      break;
    case 503:
      statusCode = 503;
      errorMessage = "Service Unavailable";
      break;
    case 522:
      statusCode = 522;
      errorMessage = "Connection Timed Out";
      break;
    default:
      statusCode = 500; // Default to 500 Internal Server Error
      errorMessage = "Internal Server Error";
      break;
  }
  logger.error(statusCode)
  res.status(statusCode).json({
    status: errorMessage,
    error: error.message,
    message: "Hubo un error en la base de datos."
  });
}
