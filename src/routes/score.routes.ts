import express from "express";
const router = express.Router();

const { getChordScore, getAllChordScores, updateChordScore } = require('../controllers/scores.controller')

router.get('/', getAllChordScores)
router.get('/:id', getChordScore)
router.post('/:id', updateChordScore)