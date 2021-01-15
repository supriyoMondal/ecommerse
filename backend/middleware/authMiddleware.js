import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers?.authorization &&
    req.headers?.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      res.status(401);
      throw new Error("Not authorize, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorize no token");
  }
  next();
});

export { protect };
