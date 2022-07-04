/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:key", (req, res) => {
    let poll_key = {poll_key:req.params.key};
    db.query(`SELECT * FROM users
    WHERE users.poll_key = $1;`,[poll_key.poll_key])
      .then(data => {
        res.render("test2",poll_key);
      })
  });

  router.post("/:key", (req, res) => {
    let title = req.body.title;
    let poll_key = {poll_key:req.params.key};
    let options = req.body.op;
    db.query(`SELECT * FROM users
    WHERE users.poll_key = $1;`,[poll_key.poll_key])
    .then(data => {
      const id = data.rows[0].id;
      poll_key={...poll_key,user_id:parseInt(id)};
      return db
      .query(`INSERT INTO titles(title,user_id)
               VALUES($1,$2)
               RETURNING *;`, [title,poll_key.user_id])
      .then((result) => {
        console.log(result.rows);
        options.forEach((option, index) => {
          return db
          .query(`INSERT INTO options(user_id,title_id,choice)
          VALUES($1,$2,$3)
          RETURNING *;`, [result.rows[0].user_id,result.rows[0].id,option])

        });




        res.render(`thanks`);
      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    })


  });

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM options`)
      .then(data => {
        const i = data.rows;
        res.json({i});
      })
  });

  return router;
};

