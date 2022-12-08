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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotelHandler = exports.UpdateHotelHandler = exports.getSingleHotelHandler = exports.getAllHotelsHandler = exports.createHotelHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const service_1 = require("../service");
const appError_1 = __importDefault(require("../utils/appError"));
const createHotelHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield (0, service_1.createHotel)(req.body);
        if (hotel) {
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: true,
                status: "success",
                message: "hotel created successfully",
                data: hotel,
            });
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.createHotelHandler = createHotelHandler;
const getAllHotelsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hotels = yield (0, service_1.getAllHotels)();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        status: "success",
        nbHits: hotels.length,
        data: hotels,
    });
});
exports.getAllHotelsHandler = getAllHotelsHandler;
const getSingleHotelHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = "hotel does not exist";
        const { params: { id }, } = req;
        const hotel = yield (0, service_1.findHotelById)(id);
        if (!hotel) {
            return next(new appError_1.default(404, message));
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            status: "success",
            data: hotel,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleHotelHandler = getSingleHotelHandler;
const UpdateHotelHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, } = req;
        const hotel = yield (0, service_1.updateHotelById)(id, req.body);
        if (!hotel) {
            return next(new appError_1.default(404, "cannot update hotel as hotel does not exist"));
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            status: "success",
            message: "hotel updated successfully",
            data: hotel,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.UpdateHotelHandler = UpdateHotelHandler;
const deleteHotelHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const hotel = yield (0, service_1.deleteHotelById)(id);
        if (!hotel) {
            return next(new appError_1.default(404, "fail to delete this hotel as it does not exist"));
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            status: "success",
            message: "successfully deletd a hotel",
            data: null,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteHotelHandler = deleteHotelHandler;
