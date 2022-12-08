import { Schema, model } from "mongoose";

interface HotelShema {
  name: string;
  city: string;
  country: string;
  address: string;
}

const hotelSchema = new Schema<HotelShema>({
  name: {
    type: String,
    minLength: 5,
  },

  city: String,
  country: String,
  address: String,
});

export const hotelModel = model("Hotel", hotelSchema);
