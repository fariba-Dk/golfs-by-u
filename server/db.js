//importing the pg library BUT we are destructuring and
//get an instance of pool
const Pool = require('pg').Pool;

const db = new Pool({
  user:"postgres",
  password:"allbetter",
  host:"localhost",
  port:5432,
  database:"golf_by_u"
});


module.exports = db;

// const db = require('../server/db/db-connection.js');

