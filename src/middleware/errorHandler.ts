import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import AppError from "../utils/appError";

const errorHandlerMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Dealing with mongoose Errors here

  let customError = {
    // set default
    success: err.success || false,
    status: err.status || "error",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later",
  };

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      status: "fail",
      message: "hotel with this id does not exist",
    });
  }

  return res.status(customError.statusCode).json({
    success: customError.success,
    status: customError.status,
    message: customError.message,
    data: null,
  });
};

export default errorHandlerMiddleware;
