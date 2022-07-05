const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  db.query(`SELECT * FROM users;`)
  .then(data => {
    const users = data.rows;
    res.render("index");
  })
});
};
