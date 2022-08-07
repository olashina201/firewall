"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.Login = exports.Register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const Register = async (req, res) => {
    try {
        const { fullName, userName, email, password, option } = req.body;
        const user = await User_1.default.findOne({ email: email });
        let atpos = email.indexOf("@");
        let domain = email.split("@")[1];
        if (user) {
            return res
                .status(400)
                .send({ error: "user with this email already exist" });
        }
        else if (atpos < 1 || domain !== "gmail.com") {
            return res
                .status(400)
                .send({ error: "only email with domain @gmail.com is supported." });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({
            fullName,
            userName,
            email,
            password: passwordHash,
            option
        });
        const saved = await newUser.save();
        return res.status(200).json({ success: true, data: saved });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("error");
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const [user] = await User_1.default.find({ userName: userName });
        const compared = await bcryptjs_1.default.compare(password, user.password);
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User with this email not found" });
        }
        else if (!compared) {
            return res
                .status(400)
                .json({ success: false, message: "email or password not correct" });
        }
        else {
            return res.status(200).json({ success: true, data: user });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("error");
    }
};
exports.Login = Login;
const deleteUser = async (req, res) => {
    const { query: { id }, } = req;
    const user = await User_1.default.deleteOne({ _id: id });
    if (!user) {
        return res.status(400).json({ success: false });
    }
    else {
        return res.status(200).json({ success: true, data: {} });
    }
};
exports.deleteUser = deleteUser;
