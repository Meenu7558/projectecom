import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    try {
        console.log("Headers Received:", req.headers);  
        console.log("Cookies Received:", req.cookies);  

        // Extract token from cookies or authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        console.log("Extracted Token:", token); 

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ message: "User not authorized (No token provided)", success: false });
        }

        // Verify the token using JWT
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log("Verified Token Payload:", tokenVerified); 

        // If token is not valid, return error
        if (!tokenVerified) {
            return res.status(401).json({ message: "User not authorized (Invalid token)", success: false });
        }

        // Attach user information to request
        req.user = tokenVerified;
        next();

    } catch (error) {
        console.error("JWT Verification Error:", error.message); 
        return res.status(401).json({ message: "User authorization failed", success: false });
    }
};

