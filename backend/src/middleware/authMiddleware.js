import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Make sure to add the .js extension

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No Token Provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }

    // Find the user from the token and attach it to the request object
    const user = await User.findById(decoded._id || decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next(); // Proceed to the next function (the controller)
  } catch (error) {
    console.error("Authentication middleware error:", error);
    res.status(401).json({ message: "Unauthorized: Token verification failed" });
  }
};

export default authMiddleware; // Use "export default"