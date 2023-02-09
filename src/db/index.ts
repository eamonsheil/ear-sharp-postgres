import {
    createChordScoresTable,
    createPitchScoresTable,
    createUsersTable,
} from "./queries";

import { Pool, Client } from 'pg';
require('dotenv').config();

const pool = new Pool();
const client = new Client();


client.connect()
client.query(createUsersTable);
client.query(createChordScoresTable);
client.query(createPitchScoresTable)
    .then(() => client.end());

module.exports = {
    query: (text: any, params: any, callback: any) => {
        return pool.query(text, params, callback)
    }
}