import { hotelModel } from "../model/hotel.model";
import { createHotelParams } from "./type";

export const createHotel = async (data: createHotelParams) => {
  return hotelModel.create(data);
};

export const findHotelById = async (id: string) => {
  return hotelModel.findById(id);
};

export const findHotelByName = async (name: string) => {
  return hotelModel.findOne({ name: name });
};

export const getAllHotels = async (data: any) => {
  return hotelModel.find(data).sort("-createdAt");
};

export const updateHotelById = async (
  id: string,
  data: Partial<createHotelParams>
) => {
  return hotelModel.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    { new: true }
  );
};

export const deleteHotelById = async (id: string) => {
  return hotelModel.findByIdAndDelete(id);
};
