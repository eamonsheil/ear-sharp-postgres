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



const updatePitchScore: RequestHandler = async (req, res) => {
    const { user, total_attempts, num_correct, num_incorrect, current_streak } = req.body;
    const new_streak = current_streak < 0 ? 0 : current_streak + 1;

    try {
        const query = `
        UPDATE pitch_scores
        SET 
            total_attempts = total_attempts + $1, 
            num_correct = num_correct + $2,
            num_incorrect = num_incorrect + $3,
            current_streak = $4
        WHERE student_id = $5
        RETURNING *
        `
        const result = await db.query(query, [total_attempts, num_correct, num_incorrect, new_streak, user.id])
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}





module.exports = { getPitchScore, getAllPitchScores, updatePitchScore }