/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const generateRandomString =  function () {
  const result = Math.random().toString(36).substring(2, 8);
  return result;

};

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.render("index");
      })
  });

  router.post("/", (req, res) => {
    console.log(req.body.name);
    let username = req.body.name;
    let email = req.body.email;
    const key = generateRandomString();
    console.log(key);
    console.log(username);
    console.log(email);
    return db
      .query(`INSERT INTO users(name, email,poll_key)
               VALUES($1,$2,$3)
               RETURNING *;`, [username, email,key])
      .then((result) => {
        console.log(result.rows);
        res.redirect(`/api/polls/${key}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
