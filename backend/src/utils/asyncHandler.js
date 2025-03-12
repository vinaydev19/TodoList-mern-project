import { ApiError } from "./ApiError.js";

const asyncHandler = (fn) => async (err, req, res, next) => {
  try {
    return await fn(err, req, res, next);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error = new ApiError(500, "Internal Server Error");
    }
    if (typeof next === "function") {
      next(error);
    }
  }
};

export { asyncHandler };
