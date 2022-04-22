import { Review, Business, User } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import JWT_SECRET from "../constants";

class ReviewController {
  static newReview = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const userId = Number(res.locals.userId);
    const { comment, rating, placeName, title } = req.body;
    const User = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!User) throw new Error("User cannot be null.");
    try {
      const business = await prisma.business.upsert({
        where: { name: placeName },
        update: { name: placeName },
        create: { name: placeName },
      });
      const review = await prisma.review.create({
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
    } catch (error) {
      prisma.$disconnect();
      res.status(500).send("Review could not be created.");
    }
  };

  static getAllReviews = async (_: Request, res: Response) => {
    const userId = res.locals.userId;
    const prisma = new PrismaClient();
    const User = await prisma.user.findUnique({
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
  };

  static getPaginatedData = async (req: Request, res: Response) => {
    let offset = parseInt(req.params.offset);
    const userId = res.locals.userId;
    const prisma = new PrismaClient();
    const User = await prisma.user.findUnique({
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
  };
}

export default ReviewController;
