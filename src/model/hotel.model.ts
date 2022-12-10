import { Schema, model } from "mongoose";

interface HotelShema {
  name: string;
  city: string;
  country: string;
  address: string;
  image: string;
  pricePerNight: string;
}

const hotelSchema = new Schema<HotelShema>(
  {
    name: {
      type: String,
      minLength: 5,
      unique: true,
    },

    city: String,
    country: String,
    address: String,
    image: String,
    pricePerNight: String,
  },
  { timestamps: true }
);

export const hotelModel = model("Hotel", hotelSchema);
