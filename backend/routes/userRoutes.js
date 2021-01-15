import express from "express";
import { check } from "express-validator";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  authUser
);

router.route("/profile").get(protect, getUserProfile);

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Enter a Password at-least 6 character long").isLength({
      min: 6,
    }),
    check("name", "Enter a name at-least 3 character long").isLength({
      min: 3,
    }),
  ],
  registerUser
);

export default router;
