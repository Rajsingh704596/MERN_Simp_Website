// Where we use next(error) in backend , here all backend error basically get and pass to client

//! Error handlers
const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Backend Error";
  const extraDetails = err.extraDetails || "Error from Backend";

  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;

//here zod validation register error pass to client
