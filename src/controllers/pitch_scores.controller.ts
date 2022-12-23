import { RequestHandler } from "express";

const db = require('../db');

const getPitchScore: RequestHandler = async (req, res) => {
    const { user } = req.body;
    try {
        const query = `
            SELECT total_attempts, num_correct, num_incorrect, current_streak FROM pitch_scores
            WHERE student_id = $1
        `
        const result = await db.query(query, [user.id])
        res.status(200).send(result)
    } catch (err) {
        if (typeof err === "string") {
            err.toUpperCase()
        } else if (err instanceof Error) {
            return res.send(err.message)
        }
    }
}

const getAllPitchScores: RequestHandler = (req, res) => {
    res.send('o.kay')
}



const updatePitchScore: RequestHandler = (req, res) => {
    res.send('o.kay')
}





module.exports = { getPitchScore, getAllPitchScores, updatePitchScore }