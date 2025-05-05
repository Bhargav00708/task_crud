import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export const checkAuth =  (req:Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    
    jwt.verify(token, "secret", (err: any, decoded: any) => {
        if (err) {
        return res.status(403).json({ message: "Invalid token" });
        }
        req.body.role = decoded.role;
        next();
    });
}