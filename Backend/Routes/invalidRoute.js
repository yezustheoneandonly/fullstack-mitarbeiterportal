export const invalidRoute = (req, res, next) => {
  const error = new Error();
  error.detail = `Combination of path "${req.originalUrl}" and method "${req.method}" not found.`
  error.status = 404;
  next(error);
};
