"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    // Dealing with mongoose Errors here
    let customError = {
        // set default
        success: err.success || false,
        status: err.status || "error",
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, try again later",
    };
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            status: "fail",
            message: "hotel with this id does not exist",
        });
    }
    return res.status(customError.statusCode).json({
        success: customError.success,
        status: customError.status,
        message: customError.message,
        data: null,
    });
};
exports.default = errorHandlerMiddleware;
