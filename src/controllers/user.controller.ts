import { RequestHandler } from "express";
const db = require('../db');

type NewUser = {
    id: number,
    email: string,
    created_on: Date,
    last_login: Date
}


const getUser: RequestHandler = async (req, res, next) => {
    const { email } = req.body;
    let user: NewUser | null = null;
    try {
        const query = `
                SELECT * FROM users
                WHERE email = $1
            `;
        const values = [email];
        const result = await db.query(query, values);
        user = result.rows[0];

        if (!user) {
            createUser(req, res, next)
        }
        // if user exists, update timestamp & set cookie
        else {

            await db.query(`
                UPDATE users 
                SET last_login=CURRENT_TIMESTAMP 
                WHERE email=$1
            `, [email]);

            res.cookie('api_access', user.id, {
                httpOnly: true,
                sameSite: 'none',
                maxAge: 60_000 * 60 * 3, // 3 hrs
                secure: true
            });
            return res.status(200).send(user)
        }
    } catch (err) {
        console.log(err)
    }
}



const createUser: RequestHandler = async (req, res, _) => {
    const { email } = req.body

    const query = `
            INSERT INTO users (email, created_on, last_login)
            VALUES ($1, current_timestamp, current_timestamp)
            RETURNING *
        `;
    const result = await db.query(query, [email]);
    const user = result.rows[0];

    const chord_scores = `
            INSERT INTO chord_scores (user_id)
            VALUES ($1)
        `
    await db.query(chord_scores, [user.id])

    const pitch_scores = `
            INSERT INTO pitch_scores (user_id)
            VALUES ($1)
        `
    await db.query(pitch_scores, [user.id])

    res.cookie('api_access', user.id, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 60_000 * 60 * 3, // 3 hrs
        secure: true
    });
    return res.status(200).send(user)
}

const logout: RequestHandler = async (req, res) => {
    return res
        .cookie('api_access', '', {
            expires: new Date(Date.now() + 3 * 100),
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        .status(200)
        .json({ message: "successfully logged out" });
}

const deleteUser: RequestHandler = async (req, res) => {
    const { id } = req.cookies.api_access
    const query = `
            DELETE FROM users 
            WHERE id = $1
            RETURNING *
        `;
    const result = await db.query(query, [id]);
    res.send({ message: "user deleted", result: result })
}


module.exports = { getUser, createUser, logout, deleteUser }