const jwt = require('jsonwebtoken');
require('dotenv').config();
import { RequestHandler } from "express";

export type validatedUser = {
    id: number,
    iat: number,
    exp: number
}

export const validateJwt: RequestHandler = (req, res, next) => {
    const token = req.cookies['access_token'];
    // console.log(token)

    if (!token) {
        return res.status(400).send({ message: "No token provided" })
    }
    jwt.verify(token, process.env.JWT_SECRET,
        (err: unknown, decoded: any) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            req.body.user = decoded;
            next();
        });
};