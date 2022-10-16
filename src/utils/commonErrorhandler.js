const getErrorObject = (message, fieldName) => {
  return { message: [{ message: message, path: [fieldName] }] };
};


const errorHandler = (message, res, code) => {
  console.log(message)
  res.status(code).send({ message, code });
};

const newError = (message, code) => {
  const error = new Error(message);
  error.code = code;
  throw error;
};

export { getErrorObject, errorHandler, newError };
