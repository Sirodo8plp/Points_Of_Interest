import { User } from "@prisma/client";
import { Request, Response } from "express";
import HashPassword from "../util/HashPassword";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import JWT_SECRET from "../constants";

class UserController {
  //   static listAll = async (req: Request, res: Response) => {
  //     //Get users from database
  //     const userRepository = getRepository(User);
  //     const users = await userRepository.find({
  //       select: ["id", "username", "role"], //We dont want to send the passwords on response
  //     });

  //     //Send the users object
  //     res.send(users);
  //   };

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
    //Get parameters from the body
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
      const token = jwt.sign(
        { userId: User.id, username: User.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
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

  //   static editUser = async (req: Request, res: Response) => {
  //     //Get the ID from the url
  //     const id = req.params.id;

  //     //Get values from the body
  //     const { username, role } = req.body;

  //     //Try to find user on database
  //     const userRepository = getRepository(User);
  //     let user;
  //     try {
  //       user = await userRepository.findOneOrFail(id);
  //     } catch (error) {
  //       //If not found, send a 404 response
  //       res.status(404).send("User not found");
  //       return;
  //     }

  //     //Validate the new values on model
  //     user.username = username;
  //     user.role = role;
  //     const errors = await validate(user);
  //     if (errors.length > 0) {
  //       res.status(400).send(errors);
  //       return;
  //     }

  //     //Try to safe, if fails, that means username already in use
  //     try {
  //       await userRepository.save(user);
  //     } catch (e) {
  //       res.status(409).send("username already in use");
  //       return;
  //     }
  //     //After all send a 204 (no content, but accepted) response
  //     res.status(204).send();
  //   };
}

export default UserController;
