"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHotelSchema = void 0;
const zod_1 = require("zod");
exports.createHotelSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "hotel name is required",
        }),
        city: (0, zod_1.string)({
            required_error: "hotel city is required",
        }),
        country: (0, zod_1.string)({
            required_error: "hotel country is required",
        }),
        address: (0, zod_1.string)({
            required_error: "hotel address is required",
        }),
    }),
});
