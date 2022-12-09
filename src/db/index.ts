const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
    query: (text: any, params: any, callback: any) => {
        return pool.query(text, params, callback)
    }
}