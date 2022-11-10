const Pool = require("pg").Pool;
const pool = new Pool({
user : "postgres",
password : "2322263291",
host : "localhost",
port : 5432,
database : "postgres"});
module.exports = pool;