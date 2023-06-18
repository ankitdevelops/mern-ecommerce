import config from "../config/index.js";

const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware for Error Handling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: config.NODE_ENV === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
