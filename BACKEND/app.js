import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
//routes.js  .js lgana pdega because type:module use kr rhe h
import jobRouter from "./routes/jobRoutes.js";

import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";

const app = express();
config({ path: "./config/config.env" });


app.use(
  cors({
    origin: [process.env.FRONTED_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

//db connection function
dbConnection();

//error ko last me rkhte h sb likhne ke baad 
app.use(errorMiddleware);


export default app;