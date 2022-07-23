"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
        };
        // connect you DB here
        await mongoose_1.default.connect(process.env.DB_URL, options);
        console.log("connected to DB");
    }
    catch (err) {
        console.log(err.toString());
    }
};
exports.connect = connect;
