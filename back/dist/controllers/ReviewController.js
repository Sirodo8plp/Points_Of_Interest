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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class ReviewController {
}
_a = ReviewController;
ReviewController.newReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const userId = Number(res.locals.userId);
    const { comment, rating, placeName, title } = req.body;
    const User = yield prisma.user.findUnique({
        where: { id: userId },
    });
    if (!User)
        throw new Error("User cannot be null.");
    try {
        const business = yield prisma.business.upsert({
            where: { name: placeName },
            update: { name: placeName },
            create: { name: placeName },
        });
        const review = yield prisma.review.create({
            data: {
                text: comment,
                title: title,
                rating: Number(rating),
                author: {
                    connect: { id: User.id },
                },
                Business: {
                    connect: { id: business.id },
                },
            },
        });
        prisma.$disconnect();
        res.status(201).send("Review was successfully created.");
    }
    catch (error) {
        prisma.$disconnect();
        res.status(500).send("Review could not be created.");
    }
});
ReviewController.getAllReviews = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    const prisma = new client_1.PrismaClient();
    const User = yield prisma.user.findUnique({
        where: { id: userId },
        select: {
            password: false,
            email: false,
            name: true,
            surname: true,
            username: true,
            _count: {
                select: { reviews: true },
            },
            reviews: {
                orderBy: {
                    id: "desc",
                },
                take: 12,
                select: {
                    Business: true,
                    title: true,
                    rating: true,
                    text: true,
                    author: false,
                    authorId: false,
                    businessId: false,
                    id: true,
                },
            },
        },
    });
    if (!User) {
        prisma.$disconnect();
        res.status(404).send("User was not found.");
        return;
    }
    prisma.$disconnect();
    res.status(200).json(User);
});
ReviewController.getPaginatedData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let offset = parseInt(req.params.offset);
    const userId = res.locals.userId;
    const prisma = new client_1.PrismaClient();
    const User = yield prisma.user.findUnique({
        where: { id: userId },
        select: {
            password: false,
            email: false,
            name: true,
            surname: true,
            username: true,
            _count: {
                select: { reviews: true },
            },
            reviews: {
                orderBy: {
                    id: "desc",
                },
                skip: offset,
                take: 12,
                select: {
                    Business: true,
                    title: true,
                    rating: true,
                    text: true,
                    author: false,
                    authorId: false,
                    businessId: false,
                    id: true,
                },
            },
        },
    });
    if (!User) {
        prisma.$disconnect();
        res.status(404).send("User was not found.");
        return;
    }
    prisma.$disconnect();
    res.status(200).json(User);
});
exports.default = ReviewController;
//# sourceMappingURL=ReviewController.js.map