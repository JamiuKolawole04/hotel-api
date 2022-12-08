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
    required: true,
    minLength: 5,
  },

  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export const hotelModel = model("Hotel", hotelSchema);
