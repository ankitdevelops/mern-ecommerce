import User from "../models/user.js";
import JWT from "jsonwebtoken";
import asyncHandler from "../services/asyncHandler.js";
import config from "../config/index.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decodedJwtPayload._id, "name email role");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Authentication Required");
  }
});

export const authorize = (...requiredRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Unauthorized Access");
    }
    next();
  });
