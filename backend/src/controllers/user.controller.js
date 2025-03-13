import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const option = {
  httpOnly: true,
  secure: true,
};

// methods
const generateAccessRefreshToken = async function (userId) {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(
      `something want wrong while generating Access & Refresh Token`,
      error
    );
  }
};

// controller
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(email);


  if (
    [username, email, password].some((field) => {
      field.trim() === "";
    })
  ) {
    throw new ApiError(400, "all field are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      400,
      "user is already registered with this email address"
    );
  }

  const createUser = await User.create({
    username,
    email,
    password,
  });

  const user = await User.findById(createUser._id).select("-password");

  if (!user) {
    throw new ApiError(400, "something want wrong while registering user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    [email, password].some((field) => {
      field.trim() === "";
    })
  ) {
    throw new ApiError(400, "all field are required");
  }

  const FindUser = await User.findOne({ email });

  if (!FindUser) {
    throw new ApiError(400, "user not found");
  }

  const isPasswordVaild = await FindUser.isPasswordCorrect(password);

  if (!isPasswordVaild) {
    throw new ApiError(400, "password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    FindUser._id
  );

  const user = await User.findById(findById._id).select(
    "-pasword -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        { user: user, accessToken, refreshToken },
        "login user successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "logout successfully"));
});

export { registerUser, loginUser, logoutUser };
