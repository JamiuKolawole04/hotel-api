"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelModel = void 0;
const mongoose_1 = require("mongoose");
const hotelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        minLength: 5,
    },
    city: String,
    country: String,
    address: String,
});
exports.hotelModel = (0, mongoose_1.model)("Hotel", hotelSchema);
