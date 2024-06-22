import jwt from "jsonwebtoken";
import { createError } from "./error.js"

export const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    const token =authorization.split(" ")[1];
    if (!token) return next(createError(401, "You are not Authenticated!"))
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
       // console.log("user", user);
         req.user = user;
         next()
    });
   
}
