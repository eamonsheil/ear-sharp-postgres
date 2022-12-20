// const app = require('express');
import { RequestHandler } from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
const db = require('../db');

const saltRounds = 10;

const registerStudent: RequestHandler = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    try {
        const query = `
            INSERT INTO students (name, email, password, created_on, last_login)
            VALUES ($1, $2, $3, current_timestamp, current_timestamp)
            RETURNING id, name, email;
        `;
        const values = [name, email, hashedPassword];
        const result = await db.query(query, values);
        const user = result.rows[0];

        const chord_scores = `
            INSERT INTO chord_scores (student_id)
            VALUES ($1)
        `
        await db.query(chord_scores, [user.id])

        const pitch_scores = `
            INSERT INTO pitch_scores (student_id)
            VALUES ($1)
        `
        await db.query(pitch_scores, [user.id])

        const token = generateToken(user.id);

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 90_000 * 3,
            secure: true
        });

        return res
            .status(200)
            .send(user);
    } catch (err: any) {
        res.status(401).json(err.message);
    }
};

const loginStudent: RequestHandler = async (req, res) => {
    // console.log(req.headers["access_token"])
    const { email, password } = req.body;
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
                UPDATE students 
                SET last_login=CURRENT_TIMESTAMP 
                WHERE email=$1
            `, [email]);

            const token = generateToken(user.id);

            res.cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'none',
                maxAge: 90_000 * 3,
                secure: true
            });

            return res
                .status(200)
                .send(user);
        } else {
            throw new Error('Invalid Password')
        }
    } catch (err: any) {
        res.status(500).json({ err });
    }
}



const generateToken = (id: number): string => {

    return jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '3h'
    })
}

const getStudent: RequestHandler = async (req, res) => {
    const { body: { user } } = req;
    const result = await db.query(` 
        SELECT id, name, email FROM students 
        WHERE id=$1
        `, [user.id])

    res.status(200).send(result)
};

const logoutStudent: RequestHandler = async (req, res) => {
    // overwrites cookie to contain no data, and sets an expiry for 3 seconds from now
    console.log('overwriting cookie....')
    return res
        .cookie('access_token', '', {
            expires: new Date(Date.now() + 3 * 100),
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        .status(200)
        .json({ message: "successfully logged out" });
};


module.exports = { registerStudent, loginStudent, getStudent, logoutStudent }