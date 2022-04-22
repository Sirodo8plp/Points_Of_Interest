import { Router } from "express";
import ReviewController from "../controllers/ReviewController";
import { checkJwt } from "../middleware/verifyJsonWebToken";

const router = Router();

router.post("/", [checkJwt], ReviewController.newReview);
router.get("/", [checkJwt], ReviewController.getAllReviews);
router.get("/paginated/:offset", [checkJwt], ReviewController.getPaginatedData);

export default router;
