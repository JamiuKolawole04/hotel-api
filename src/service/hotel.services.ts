import { hotelModel } from "../model/hotel.model";
import { createHotelParams } from "./type";

export const createHotel = async (data: createHotelParams) => {
  return hotelModel.create(data);
};
