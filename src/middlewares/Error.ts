import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/Error";
import { ENV, MESSAGES, STATUS_CODE } from "../utils/Constant";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
  let message = MESSAGES.INTERNAL_SERVER_ERROR;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  const stack =
    process.env.NODE_ENV === ENV.DEVELOPMENT ? err.stack : undefined;
  res.status(statusCode).json({
    success: false,
    message,
    stack,
  });
};

export default errorMiddleware;
