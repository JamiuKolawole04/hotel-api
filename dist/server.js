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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const db_1 = require("./db/db");
const hotel_route_1 = __importDefault(require("./routes/hotel.route"));
const not_found_1 = require("./middleware/not-found");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// middlewres
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: false, limit: "50mb", parameterLimit: 50000 }));
app.use((0, cors_1.default)());
(0, mongoose_1.set)("strictQuery", false);
app.use("/api/hotel", hotel_route_1.default);
app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        sucess: true,
        message: "server on!",
    });
}));
app.use(not_found_1.notFound);
app.use(errorHandler_1.default);
// starting server
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)(process.env.MONGO_URI);
        console.log("db connected");
        app.listen(PORT, () => console.log(`Server  listening on port ${PORT}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
