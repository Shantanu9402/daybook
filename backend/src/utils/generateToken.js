import jwt from "jsonwebtoken"; // 👈 Use import instead of require

const generateToken = (_id, res) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    // Add secure: true and sameSite: "None" only when deploying to production with HTTPS
    // For development (like with localhost), you might need to comment these out.
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
  });
};

export default generateToken; // 👈 Use export default