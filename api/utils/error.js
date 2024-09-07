export const errorHandler = (errorStatusCode, errorMessage) => {
  const customError = new Error();
  customError.statusCode = errorStatusCode;
  customError.message = errorMessage;
  return customError;
};
