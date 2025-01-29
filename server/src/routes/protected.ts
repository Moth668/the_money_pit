import { Router } from "express";
import jwt from "jsonwebtoken";

const protectedRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

protectedRouter.get((req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Authorication Token is missing" });
  }

  const token = authToken.split('')[1];  
    try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'Protected route accessed', user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});
    export {protectedRouter};