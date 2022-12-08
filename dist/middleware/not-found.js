"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (_, res) => res.status(404).json({
    success: false,
    message: "route does not exist",
    data: null,
});
exports.notFound = notFound;
