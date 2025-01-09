import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; // Get token from cookies

    if (!token) {
        return next(errorHandler(401, "Access Denied")); // No token found
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(errorHandler(403, "Token is invalid")); // Token verification failed
        }

        req.user = decoded; // Attach the decoded token (user data) to the request object
        next();
    });
};
