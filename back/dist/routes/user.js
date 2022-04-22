"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const verifyJsonWebToken_1 = require("../middleware/verifyJsonWebToken");
const router = (0, express_1.Router)();
router.get("/:id([0-9]+)", [verifyJsonWebToken_1.checkJwt], UserController_1.default.getOneById);
router.post("/", UserController_1.default.newUser);
exports.default = router;
//# sourceMappingURL=user.js.map