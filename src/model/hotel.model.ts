import { Schema, model } from "mongoose";

interface HotelShema {
  name: string;
  city: string;
  country: string;
  address: string;
  image: string;
  pricePerNight: string;
  brand: string;
}

const hotelSchema = new Schema<HotelShema>(
  {
    name: {
      type: String,
      unique: true,
    },

    city: String,
    country: String,
    address: String,
    image: String,
    pricePerNight: String,
    brand: String,
  },
  { timestamps: true }
);

export const hotelModel = model("Hotel", hotelSchema);
