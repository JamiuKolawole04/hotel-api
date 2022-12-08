import { object, string, TypeOf, z } from "zod";

export const createHotelSchema = object({
  body: object({
    name: string({
      required_error: "hotel name is required",
    }),

    city: string({
      required_error: "hotel city is required",
    }),
    country: string({
      required_error: "hotel country is required",
    }),
    address: string({
      required_error: "hotel address is required",
    }),
  }),
});
