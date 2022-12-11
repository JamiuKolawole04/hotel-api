import { NextFunction, Request, response, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  createBrand,
  findBrandById,
  getAllBrands,
  updateBrandById,
  deleteBrandById,
} from "../service";
import { createBrandShema } from "../service/type";
import AppError from "../utils/appError";

export const createBrandHandler = async (
  req: Request<{}, {}, createBrandShema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const brand = await createBrand(req.body);

    if (brand) {
      return res.status(StatusCodes.CREATED).json({
        success: true,
        status: "success",
        message: "Brand created",
        data: brand,
      });
    }
  } catch (err: any) {
    if (err.code && err.code === 11000) {
      return res.status(409).json({
        success: false,
        status: "error",
        message: "brand name already exists",
        data: null,
      });
    }
    next(err);
  }
};

export const getSingleBrandHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    const brand = await findBrandById(id);

    if (!brand) {
      return next(new AppError(404, "brand with this id does not exist"));
    }

    res.status(StatusCodes.OK).json({
      success: true,
      status: "success",
      data: brand,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBrandsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const brands = await getAllBrands();

    res.status(StatusCodes.OK).json({
      success: true,
      status: "success",
      nbHits: brands.length,
      data: brands,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBrandHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    const brand = await updateBrandById(id, req.body);

    if (
      brand?.name === "bellagio" ||
      brand?.name === "kroger" ||
      brand?.name === "vanetian"
    ) {
      return next(
        new AppError(403, "default brands cannot be modified or deleted")
      );
    }

    if (!brand) {
      return next(
        new AppError(404, "cannot update brand as brand does not exist")
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      status: "success",
      message: "brand updated successfully",
      data: brand,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBrandHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.params.id;
    const brand = await deleteBrandById(id);

    if (
      brand?.name === "bellagio" ||
      brand?.name === "kroger" ||
      brand?.name === "vanetian"
    ) {
      return next(
        new AppError(403, "default brands cannot be modified or deleted")
      );
    }

    if (!brand) {
      return next(
        new AppError(404, "fail to delete this brand as it does not exist")
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      status: "success",
      message: "successfully deletd a brand",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
