"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReviewController_1 = __importDefault(require("../controllers/ReviewController"));
const verifyJsonWebToken_1 = require("../middleware/verifyJsonWebToken");
const router = (0, express_1.Router)();
router.post("/", [verifyJsonWebToken_1.checkJwt], ReviewController_1.default.newReview);
router.get("/", [verifyJsonWebToken_1.checkJwt], ReviewController_1.default.getAllReviews);
router.get("/paginated/:offset", [verifyJsonWebToken_1.checkJwt], ReviewController_1.default.getPaginatedData);
exports.default = router;
//# sourceMappingURL=review.js.map