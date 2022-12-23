import express, { RequestHandler } from "express";
// const db = require('./db');
import cookieParser from 'cookie-parser';
import cors from 'cors';
const helmet = require('helmet');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3333;


// origins are dev server, postman server, and production url
const allowedOrigins = ["http://127.0.0.1:5173", "http://localhost:4000", "http://earsharpener.net", "https://earsharpener.net"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin as string) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(`The CORS policy for this site does not
          allow access from the specified Origin.`), false);
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(cookieParser());
app.use(helmet());


app.use('/api/student', require('./routes/student.routes'));
app.use('/api/scores', require('./routes/scores.routes'));


app.get("/", async (req, res) => {
  res.json({ message: "welcome to the Ear Sharpener API! What are you doing here?" })
});

app.listen(port, async () => {
  console.log(`connected to database on port ${port}`);
});


process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
});