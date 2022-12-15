// const app = require('express');
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from "../models/student.model";
const db = require('../db');

const saltRounds = 10;

const registerStudent = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    try {
        const query = `
            INSERT INTO students (name, email, password, created_on, last_login)
            VALUES ($1, $2, $3, current_timestamp, current_timestamp)
            RETURNING *
        `;
        const values = [name, email, hashedPassword];
        const result = await db.query(query, values);
        const user = result.rows[0];

        const token = generateToken(user.id);

        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 90_000_000 * 3,
            signed: true
        });

        return res
            .status(200)
            .send({ ...user, token });
    } catch (err: any) {
        res.status(401).json(err.message);
    }
};

const loginStudent = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.signedCookies)
    try {
        const query = `
            SELECT * FROM students
            WHERE email = $1
        `;
        const values = [email];
        const result = await db.query(query, values);
        const user = result.rows[0];

        if (!user) {
            throw new Error('Invalid Email')
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (user && isValid) {
            await db.query(`
                UPDATE students SET last_login=CURRENT_TIMESTAMP 
                WHERE email=$1
                RETURNING *
            `, [email]);

            const token = generateToken(user.id);

            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 90_000_000 * 3,
                signed: true
            });

            return res
                .status(200)
                .send({ ...user, token: token });
        } else {
            throw new Error('Invalid Password')
        }
    } catch (err: any) {
        res.status(500).json(err.message);
    }
}



const generateToken = (id: number): string => {

    return jwt.sign({ id }, "earsharp", {
        expiresIn: 90_000_000
    })
}

const getStudent = async (req: Request, res: Response) => {
    console.log(res)
};

const logoutStudent = async (req: Request, res: Response) => {
    console.log(res)
};


module.exports = { registerStudent, loginStudent, getStudent, logoutStudent }