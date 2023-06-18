import User from "../models/user.js";
import asyncHandler from "../services/asyncHandler.js";
import mailHelper from "../utils/mailHelper.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

/**
 * Register a new User
 * @route POST /api/users/
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} The JWT token in response and user object.
 * @throws {object} Returns a 400 status code if email already exists, returns 500 if registrations fails.
 */

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.getJwtToken();

  user.password = undefined;
  res.cookie("token", token, cookieOptions);

  let message = `
  Hi ${user.name}
  
  You have successfully Created Your Account at TeeVibe.
  Order the latest trendy T-shirt now.
  `;

  await mailHelper({
    email: user.email,
    subject: "Registration Successfully",
    message,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    role: user.role,
    joinedOn: user.createdAt,
    token,
  });
});

/**
 * Login a new User
 * @route POST /api/users/login
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} The JWT token in response and the user object.
 * @throws {object} Returns a 400 status code if email not exists,.
 */

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(400);
    throw new Error("User does not exists");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (isPasswordMatched) {
    const token = user.getJwtToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);

    let message = "Logged In Successfully in new device";
    await mailHelper({
      email: user.email,
      subject: "New Login",
      message,
    });

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      role: user.role,
      joinedOn: user.createdAt,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Wrong Password");
  }
});

/**
 * Logout a new User
 * @route POST /api/users/
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} The JWT token in response and user object.
 * @throws {object} Returns a 400 status code if email already exists, returns 500 if registrations fails.
 */

const logout = asyncHandler(async (_req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

export { registerUser, login, logout };
