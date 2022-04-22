"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const HashPassword_1 = __importDefault(require("../util/HashPassword"));
const client_1 = require("@prisma/client");
const jwt = __importStar(require("jsonwebtoken"));
const constants_1 = __importDefault(require("../constants"));
class UserController {
}
_a = UserController;
UserController.getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const id = Number(req.params.id);
    const user = yield prisma.user.findUnique({
        where: { id },
    });
    if (user === null) {
        res.json(user);
        yield prisma.$disconnect();
        return;
    }
    res.status(404).send("User was not found");
    yield prisma.$disconnect();
    return;
});
UserController.newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    let { username, password, email, name, surname } = req.body;
    const hash = (0, HashPassword_1.default)(password);
    try {
        const User = yield prisma.user.create({
            data: {
                username,
                password: hash,
                email,
                name,
                surname,
            },
        });
        const token = jwt.sign({ userId: User.id, username: User.username }, constants_1.default, { expiresIn: "1h" });
        res.status(201).send("User was successfully created.");
        yield prisma.$disconnect();
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send("User creation failed");
        yield prisma.$disconnect();
        return;
    }
});
exports.default = UserController;
//# sourceMappingURL=UserController.js.map