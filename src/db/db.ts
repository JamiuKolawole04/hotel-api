import mongoose, { connect } from "mongoose";

export const connectDB = (url: string): Promise<typeof mongoose> => {
  return connect(url);
};
