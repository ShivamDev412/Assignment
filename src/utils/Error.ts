import { STATUS_CODE, MESSAGES } from "./Constant";

const { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = STATUS_CODE;
const {
  UNAUTHORIZED: UNAUTHORIZED_MESSAGE,
  NOT_FOUND: NOT_FOUND_MESSAGE,
  BAD_REQUEST: BAD_REQUEST_MESSAGE,
  INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_MESSAGE,
} = MESSAGES;
class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
class NotFoundError extends AppError {
  constructor(message: string = NOT_FOUND_MESSAGE) {
    super(message, NOT_FOUND);
  }
}
class BadRequestError extends AppError {
  constructor(message: string = BAD_REQUEST_MESSAGE) {
    super(message, BAD_REQUEST);
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string = UNAUTHORIZED_MESSAGE) {
    super(message, UNAUTHORIZED);
  }
}
class InternalServerError extends AppError {
  constructor(message: string = INTERNAL_SERVER_ERROR_MESSAGE) {
    super(message, INTERNAL_SERVER_ERROR);
}
}
export { AppError, NotFoundError, BadRequestError, UnauthorizedError, InternalServerError };
