import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import DecryptPassword from "../util/DecryptPassword";
import JWT_SECRET from "../constants";
import { PrismaClient, User } from "@prisma/client";

class AuthController {
  static login = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      await prisma.$disconnect();
      res.status(400).send("Username and password were not given.");
      return;
    }
    const user: User | null = await prisma!.user.findUnique({
      where: { username },
    });
    if (user === null) {
      res
        .status(401)
        .json({ message: "An account does not exist with this username" });
      await prisma.$disconnect();
      return;
    }
    if (!DecryptPassword(password, user?.password!)) {
      res.status(401).json({ message: "Invalid Credentials." });
      await prisma.$disconnect();
      return;
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
    await prisma.$disconnect();
    return;
  };
}

export default AuthController;
