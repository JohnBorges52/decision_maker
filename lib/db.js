let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}


const getPollWithID = function(id) {
  return dbParams
    .query(`
    SELECT choice FROM options
    WHERE title_id = $1;`, [id])
    .then ((response) => {
      console.log(response.rows[0]);
      return response.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    })
}

console.log(getPollWithID(2));






module.exports = dbParams;
