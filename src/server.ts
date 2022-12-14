import express, { RequestHandler } from "express";
const db = require('./db');
import cookieParser from 'cookie-parser';
import cors from 'cors';
const helmet = require('helmet');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3333;


app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(cookieParser("secret"));
app.use(cors());
app.use(helmet());


app.use('/api/student', require('./routes/student.routes'));


app.get("/", async (req, res) => {
  const rows = await db.query("SELECT * FROM chords");
  res.send(rows)
});

app.listen(port, async () => {
  console.log(`connected to database on port ${port}`);
});


process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
});