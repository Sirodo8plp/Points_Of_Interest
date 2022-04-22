"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
const DecryptPassword = (password, hash) => {
    return bcryptjs_1.default.compareSync(password, hash);
};
exports.default = DecryptPassword;
//# sourceMappingURL=DecryptPassword.js.map