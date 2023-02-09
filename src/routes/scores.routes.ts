import express from "express";
const router = express.Router();

const { getChordScore, getAllChordScores, updateChordScore } = require('../controllers/chord_scores.controller')
const { getPitchScore, getAllPitchScores, updatePitchScore } = require('../controllers/pitch_scores.controller')

// Chord Score Routes
router.get('/chords', getAllChordScores)
router.get('/chord', getChordScore)
router.post('/chord', updateChordScore)

// Pitch Score Routes
router.get('/pitches', getAllPitchScores)
router.get('/pitch', getPitchScore)
router.post('/pitch', updatePitchScore)

module.exports = router;