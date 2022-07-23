"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handlers_1 = require("../handlers");
const router = (0, express_1.Router)();
router.post("/register", handlers_1.Register);
router.post("/login", handlers_1.Login);
exports.default = router;
