import { Router } from "express";
import { checkEmailForDuplicate } from "../middlewares/check-email";
import { validateLoginDetails } from "../middlewares/validate-login-details";
import { validateUserDetails } from "../middlewares/validate-user-details";
import {
  createUser,
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/UserController";

const router = Router();

router.post(
  "/",
  validateLoginDetails,
  checkEmailForDuplicate,
  validateUserDetails,
  createUser
);

router.post("/login", validateLoginDetails, loginUser);

router.delete("/logout", logoutUser);

router.post("/refresh", refreshToken);

export default router;
