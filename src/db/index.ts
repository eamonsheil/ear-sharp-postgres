import { chordsTableQuery, dbInitQuery, seedChordsTable } from "./sqlQueries";

const { Pool, Client } = require('pg');
require('dotenv').config();

const pool = new Pool();
const client = new Client();


client.connect()
client.query(dbInitQuery);
client.query(chordsTableQuery);
client.query(seedChordsTable)
    .then(() => client.end());

module.exports = {
    query: (text: any, params: any, callback: any) => {
        return pool.query(text, params, callback)
    }
}