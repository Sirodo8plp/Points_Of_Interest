import { User } from "@prisma/client";
import { Request, Response } from "express";
import HashPassword from "../util/HashPassword";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import JWT_SECRET from "../constants";

class UserController {
  static getOneById = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    //Get the ID from the url
    const id: number = Number(req.params.id);

    const user: User | null = await prisma!.user.findUnique({
      where: { id },
    });

    if (user === null) {
      res.json(user);
      await prisma.$disconnect();
      return;
    }
    res.status(404).send("User was not found");
    await prisma.$disconnect();
    return;
  };

  static newUser = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();

    let { username, password, email, name, surname } = req.body;
    const hash = HashPassword(password);

    try {
      const User: User = await prisma!.user.create({
        data: {
          username,
          password: hash,
          email,
          name,
          surname,
        },
      });
      res.status(201).send("User was successfully created.");
      await prisma.$disconnect();
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send("User creation failed");
      await prisma.$disconnect();
      return;
    }
  };
}

export default UserController;
