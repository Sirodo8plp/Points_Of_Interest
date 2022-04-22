import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

type MiddlewareArguments = {
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  req?: express.Request;
  res?: express.Response;
  next?: express.NextFunction;
};

export default MiddlewareArguments;
