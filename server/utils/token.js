import jwt from "jsonwebtoken";

export const generateToken = (id, role = "user") => {
  try {

    
    
    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

    const token = jwt.sign(
      { id, role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }  // Token expires in 7 days
    );
    return token;
  } catch (error) {
    console.log("Error generating token:", error);
    throw new Error("Failed to generate token");  // Re-throwing error for better error tracking
  }
};
