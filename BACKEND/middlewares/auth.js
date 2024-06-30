import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Check if the token exists in the cookies
  const { token } = req.cookies;
  //ye token tb generate hoga jb user login krega
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  //Verify the token and attach /store the user to the request object.

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  //next krke aage ke lie hm bhej denge like to controller function
  next();
});
