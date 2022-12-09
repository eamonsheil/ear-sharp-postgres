import express, { RequestHandler } from "express";
const db = require('./db');
import cookieParser from 'cookie-parser';
import cors from 'cors';
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3333;

// const sequelize = new Sequelize(process.env.DATABASE_URL as Options);


app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(cookieParser());
app.use(cors());


app.use('/api/student', require('./routes/student.routes'));


const modelDefiners = [
  require('./models/student.model')
];

// define all models according to their files
// for (const model of modelDefiners) {
//   model(sequelize);
// }


app.get("/", async (req, res) => {
  const rows = await db.query("SELECT * FROM chords");
  res.send(rows)
});

app.listen(port, async () => {
  // try {
  //   await sequelize.authenticate();
  //   console.log('connect established successfully');
  // } catch (err) {
  //   console.log("unable to connnect: ", err)
  // }
  console.log(`connected to database on port ${port}`);
});
