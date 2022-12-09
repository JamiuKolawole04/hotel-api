import { brandModel } from "../model/brand.model";
import { createBrandShema } from "./type";

export const createBrand = async (data: createBrandShema) => {
  return brandModel.create(data);
};

export const findBrandById = async (id: string) => {
  return brandModel.findById(id);
};

export const getAllBrands = async () => {
  return brandModel.find({});
};

export const updateBrandById = async (
  id: string,
  data: Partial<createBrandShema>
) => {
  return brandModel.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    {
      new: true,
    }
  );
};

export const deleteBrandById = async (id: string) => {
  return brandModel.findByIdAndDelete(id);
};
