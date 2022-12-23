import express from "express";
import { validateJwt } from "../middleware/authJwt";
const router = express.Router();

const { getChordScore, getAllChordScores, updateChordScore } = require('../controllers/chord_scores.controller')
const { getPitchScore, getAllPitchScores, updatePitchScore } = require('../controllers/pitch_scores.controller')

router.get('/chords', getAllChordScores)
router.get('/chord', validateJwt, getChordScore)
router.post('/chord', validateJwt, updateChordScore)

router.get('/pitches', getAllPitchScores)
router.get('/pitch', validateJwt, getPitchScore)
router.post('/pitch', validateJwt, updatePitchScore)




module.exports = router;