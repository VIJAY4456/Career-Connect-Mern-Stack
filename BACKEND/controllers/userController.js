import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

//async function isliye use krte h agr register function h to thoda time lega 
export const register = catchAsyncErrors(async (req, res, next) => {
  //req.body (ye frontend hota h ya postman ) jha se hm data get krete h
  const { name, email, phone, password, role } = req.body;

  //if user missing any detail in this ...will show message Please fill full form!
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }

  //ye function dekhega jis email se user ne register kiya kya wo already registered h ya nhi
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  //a new user is created in the MongoDB database with the provided details.
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });
  //if user suceesfully registered then send message "User Registered!"
  sendToken(user, 201, res, "User Registered!");
  // res.status(200).json({
  //     success:true,
  //     message:"User Registered!",
  //     user,
  // })
});


// postman man login vaerify krte time ned point check kr lena (http://localhost:4000/api/v1/user/login)
export const login = catchAsyncErrors(async (req, res, next) => {
  //password eamil role ke liye request krnege
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    //if password or email wrong
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    //if password not matched
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      //registered ke time jo user mila tha agr wo same role login ke time nhi match kiya then
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

//logout check krte time http://localhost:4000/api/v1/user/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  //logout krte time jo cookie save hoti husse ek token generate hota h wo  hme htana pdta h ...uske corresponding jo token save h
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});
//frontend me authorization ke liye user required  hoga isiliye user ko get krne ke liye ye function
export const getUser = catchAsyncErrors((req, res, next) => {
  //user save ho gya
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
