import { Schema, model } from "mongoose";

interface BrandSchema {
  name: string;
}

const brandSchema = new Schema<BrandSchema>(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export const brandModel = model("Brand", brandSchema);
