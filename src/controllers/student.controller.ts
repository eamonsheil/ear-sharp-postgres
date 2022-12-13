// const app = require('express');
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
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
        `;
        const values = [name, email, hashedPassword];
        const result = await db.query(query, values);
        const user: CreateUserDto = result.rows[0];
        console.log(user)
        res.status(200).send(user);
    } catch (err: any) {
        res.status(401).json({ error: "email already registered" });
    }
};

const loginStudent = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const query = `
        SELECT * FROM students
        WHERE email = $1
        `;
        const values = [email];
        const result = await db.query(query, values);
        const user = result.rows[0];

        const isValid = await bcrypt.compare(password, user.password)
        if (user && isValid) {
            await db.query(`
                UPDATE students SET last_login=CURRENT_TIMESTAMP 
                WHERE email=$1
            `, [email]);
            return res.status(200).json(user);
        } else {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

const getStudent = async (req: Request, res: Response) => {
    console.log(res)
};

const logoutStudent = async (req: Request, res: Response) => {
    console.log(res)
};


module.exports = { registerStudent, loginStudent, getStudent, logoutStudent }