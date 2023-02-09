import express, { RequestHandler } from "express";
// const db = require('./db');w
import cookieParser from 'cookie-parser';
import cors from 'cors';
const helmet = require('helmet');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3333;

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:4000", "http://localhost:3000", "http://earsharpener.net", "https://earsharpener.net"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(cookieParser());
app.use(helmet());

app.use('/api/scores', require('./routes/scores.routes'));
app.use('/api/user', require('./routes/user.routes'));



app.get("/", async (_, res) => {
  res.json({ message: "welcome to the Ear Sharpener API! What are you doing here?" })
});

app.listen(port, async () => {
  console.log(`connected to database on port ${port}`);
});


process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
});