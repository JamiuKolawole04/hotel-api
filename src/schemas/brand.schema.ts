import { object, string, TypeOf, z } from "zod";

export const createBrandSchema = object({
  body: object({
    name: string({
      required_error: "brand name is required",
    }),
  }),
});
