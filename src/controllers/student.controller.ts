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
            maxAge: 90_000_000 * 2,
            // signed: true
        });

        return res
            .status(200)
            .send({ ...user, token });
    } catch (err: any) {
        res.status(401).json(err.message);
    }
};

const loginStudent: RequestHandler = async (req, res) => {
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
                RETURNING *
            `, [email]);

            const token = generateToken(user.id);

            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 90_000_000 * 3,
                signed: true,
                secure: true
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

    return jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '7d'
    })
}

const getStudent: RequestHandler = async (req, res) => {
    const { body: { user } } = req;
    const result = await db.query(` 
        SELECT * FROM students 
        WHERE id=$1
        `, [user.id])

    res.status(200).send(result)
};

const logoutStudent: RequestHandler = async (req, res) => {
    return res
        .clearCookie('token')
        .status(200)
        .json({ message: "successfully logged out" });
};


module.exports = { registerStudent, loginStudent, getStudent, logoutStudent }