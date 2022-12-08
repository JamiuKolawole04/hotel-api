"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotelById = exports.updateHotelById = exports.getAllHotels = exports.findHotelById = exports.createHotel = void 0;
const hotel_model_1 = require("../model/hotel.model");
const createHotel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return hotel_model_1.hotelModel.create(data);
});
exports.createHotel = createHotel;
const findHotelById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return hotel_model_1.hotelModel.findById(id);
});
exports.findHotelById = findHotelById;
const getAllHotels = () => __awaiter(void 0, void 0, void 0, function* () {
    return hotel_model_1.hotelModel.find({});
});
exports.getAllHotels = getAllHotels;
const updateHotelById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return hotel_model_1.hotelModel.findByIdAndUpdate(id, {
        $set: data,
    }, { new: true });
});
exports.updateHotelById = updateHotelById;
const deleteHotelById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return hotel_model_1.hotelModel.findByIdAndDelete(id);
});
exports.deleteHotelById = deleteHotelById;
