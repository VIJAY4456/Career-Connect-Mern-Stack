import express from "express";
import {
  login,
  register,
  logout,
  getUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/logout", logout);

//agr ek baar user logout ho chuka h mtlb uska cokkie and token delete ho chuka h agr dubara logout krnege then uske paas token nhi h to wo 
//(User Not Authorized) this authorization  ...mtlb user registeed ya login nhi h not registed
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
export default router;
