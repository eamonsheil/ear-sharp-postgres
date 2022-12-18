import { RequestHandler } from "express";

const db = require('../db');

const getChordScore: RequestHandler = async (req, res) => {
    try {
        const query = `
            SELECT * FROM chord_scores
            WHERE student_id = $1
        `
        const result = await db.query(query, req.params.id)
        res.send()
    } catch (err) {
        if (typeof err === "string") {
            err.toUpperCase()
        } else if (err instanceof Error) {
            return res.send(err.message)
        }
    }

}

const getAllChordScores: RequestHandler = (req, res) => {
    res.send('o.kay')
}



const updateChordScore: RequestHandler = (req, res) => {
    res.send('o.kay')
}





module.exports = { getChordScore, getAllChordScores, updateChordScore }