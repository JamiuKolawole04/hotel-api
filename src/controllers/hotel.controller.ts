import { NextFunction, Request, response, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  createHotel,
  findHotelById,
  updateHotelById,
  deleteHotelById,
  getAllHotels,
  findHotelByName,
} from "../service";
import { createHotelParams } from "../service/type";
import AppError from "../utils/appError";

export const createHotelHandler = async (
  req: Request<{}, {}, createHotelParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, city, country, address } = req.body;
    if (
      name.length < 0 ||
      city.length < 0 ||
      country.length < 0 ||
      address.length < 0
    ) {
      return next(new AppError(400, "please fill all inputs"));
    }
    let brand = req.body.brand;

    let hotel: any = await findHotelByName(name);

    if (hotel) {
      return next(new AppError(409, "hotel already exists"));
    }

    hotel = await createHotel({
      ...req.body,
      brand: brand.toLocaleLowerCase(),
    });
    if (hotel) {
      return res.status(StatusCodes.CREATED).json({
        success: true,
        status: "success",
        message: "hotel created successfully",
        data: hotel,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getAllHotelsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await getAllHotels();

    res.status(StatusCodes.OK).json({
      success: true,
      status: "success",
      nbHits: hotels.length,
      data: hotels,
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message: string = "hotel does not exist";
    const {
      params: { id },
    } = req;
    const hotel = await findHotelById(id);

    if (!hotel) {
      return next(new AppError(404, message));
    }

    res.status(StatusCodes.OK).json({
      success: true,
      status: "success",
      data: hotel,
    });
  } catch (err) {
    next(err);
  }
};

export const UpdateHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    const hotel = await updateHotelById(id, req.body);

    if (!hotel) {
      return next(
        new AppError(404, "cannot update hotel as hotel does not exist")
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      status: "success",
      message: "hotel updated successfully",
      data: hotel,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.params.id;
    const hotel = await deleteHotelById(id);

    if (!hotel) {
      return next(
        new AppError(404, "fail to delete this hotel as it does not exist")
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      status: "success",
      message: "successfully deletd a hotel",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
