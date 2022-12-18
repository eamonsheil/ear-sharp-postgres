import { RequestHandler } from "express";

const db = require('../db');

const getChordScore: RequestHandler = async (req, res) => {


    try {


        const query = `
            SELECT * FROM chord_scores
            WHERE student_id = $1
        `
        const result = await db.query(query,)
    } catch (err) {
        if (typeof err === "string") {
            err.toUpperCase()
        } else if (err instanceof Error) {
            return res.send(err.message)
        }
    }
}