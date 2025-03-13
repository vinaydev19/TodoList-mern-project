import express from "express";
import cookieParser from "cookie-parser";
import core from "cors";

const app = express();

app.use(
  core({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json());

// router import
import UserRouter from "./routes/user.routes.js";

app.use("api/v1/users", UserRouter);


// error use middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
