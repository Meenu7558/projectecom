import jwt from 'jsonwebtoken';

export const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token provided", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // ✅ Check if role is admin
    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only.", success: false });
    }

    req.admin = decoded; // Attach decoded token to request
    next();

  } catch (error) {
    return res.status(401).json({ message: error.message || "Authorization failed", success: false });
  }
};
