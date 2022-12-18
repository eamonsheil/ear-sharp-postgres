import express from "express";
const router = express.Router();
import { validateJwt } from '../middleware/authJwt'
const { registerStudent, loginStudent, getStudent, logoutStudent } = require('../controllers/student.controller');

router.post('/register', registerStudent)
router.post('/login', loginStudent)
router.get('/me', validateJwt, getStudent)
router.get('/logout', logoutStudent)



module.exports = router;