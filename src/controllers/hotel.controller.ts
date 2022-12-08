import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { createHotel } from "../service";

export const createHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotel = await createHotel(req.body);
    if (hotel) {
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "hotel created successfully",
        data: hotel,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
