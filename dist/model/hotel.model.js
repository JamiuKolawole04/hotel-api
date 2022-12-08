"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelModel = void 0;
const mongoose_1 = require("mongoose");
const hotelSchema = new mongoose_1.Schema({
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
exports.hotelModel = (0, mongoose_1.model)("Hotel", hotelSchema);
