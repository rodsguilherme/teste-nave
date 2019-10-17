const sqlite3 = require('sqlite3-promisify');

const path = require('path');
// eslint-disable-next-line no-undef
const dbPath = path.resolve(__dirname, 'controleDeCandidatos.db');

let database = new sqlite3(dbPath);

module.exports = database;