import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const verifyUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("authorization").replace("bearer ", "");

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!decodedToken) {
      throw new ApiError(401, "unauthorized request");
    }

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "invalid access token");
  }
});

export { verifyUser };
