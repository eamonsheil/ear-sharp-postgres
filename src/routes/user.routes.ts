import express from "express";
const { getUser, createUser, logout, deleteUser } = require("../controllers/user.controller")
const router = express.Router();

router.post('/me', getUser)
router.post('/register', createUser)
router.post('/user', deleteUser)
router.get('/logout', logout)



module.exports = router;