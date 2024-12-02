interface ErrorWithStatus extends Error {
  status: string
}

export const handleError = (status, message) => {
  const error = new Error() as ErrorWithStatus;
  error.status = status;
  error.message = message;
  return error;
};
