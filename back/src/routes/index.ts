import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import review from "./review";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/review", review);

export default routes;
