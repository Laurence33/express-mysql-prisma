import { Router } from "express";
import { getAllUsers } from "../controllers/UserController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import userRouter from "./user.route";

const router = Router();

router.get("/users", authenticate, authorize(["ADMIN"]), getAllUsers);
router.use("/user", userRouter);

export default router;
