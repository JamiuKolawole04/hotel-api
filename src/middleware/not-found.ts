import { Request, Response } from "express";

export const notFound = (_: Request, res: Response) =>
  res.status(404).json({
    success: false,
    message: "route does not exist",
    data: null,
  });
