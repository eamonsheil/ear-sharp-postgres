const jwt = require('jsonwebtoken');
require('dotenv').config();
import { RequestHandler } from "express";

export type validatedUser = {
    id: number,
    iat: number,
    exp: number
}

export const validateJwt: RequestHandler = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).send("No access token")
    }
    try {
        console.log(req.cookies())
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token !');
    }
};