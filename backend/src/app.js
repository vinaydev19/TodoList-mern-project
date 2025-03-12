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

export default app;
