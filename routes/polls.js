const express = require('express');
const router  = express.Router();
var nodemailer = require("nodemailer");

module.exports = (db) => {
  router.get("/:key", (req, res) => {
    let poll_key = {poll_key:req.params.key};
    db.query(`SELECT * FROM users
    WHERE users.poll_key = $1;`,[poll_key.poll_key])
      .then(data => {
        res.render("form",poll_key);
      })
  });

  router.post("/:key", (req, res) => {
    //console.log(req.body);
    let title = req.body.title;
    let poll_key = {poll_key:req.params.key};
    let options = req.body.op;
    console.log("options",options);
    let descriptions = req.body.description;
    console.log("descriptions",descriptions);
    db.query(`SELECT * FROM users
    WHERE users.poll_key = $1;`,[poll_key.poll_key])
    .then(data => {
      const id = data.rows[0].id;
      const email = data.rows[0].email;
      const name = data.rows[0].name;
      poll_key={...poll_key,user_id:parseInt(id)};
      return db
      .query(`INSERT INTO titles(title,user_id)
               VALUES($1,$2)
               RETURNING *;`, [title,poll_key.user_id])
      .then((result) => {
        //console.log(result.rows);
        //console.log(options);
        if (!Array.isArray(options)) {
          return db
          .query(`INSERT INTO options(user_id,title_id,choice,description)
          VALUES($1,$2,$3,$4)
          RETURNING *;`, [result.rows[0].user_id,result.rows[0].id,options,descriptions])
          .then(()=>{
            res.render(`complete`,poll_key);

          });

        }else{
          options.forEach((options, index) => {
            return db
            .query(`INSERT INTO options(user_id,title_id,choice,description)
            VALUES($1,$2,$3,$4)
            RETURNING *;`, [result.rows[0].user_id,result.rows[0].id,options,descriptions[index]])
          });
        }
        var transport = nodemailer.createTransport({
          host: "smtp.zoho.com",
          port: 465,
          secure: true, //ssl
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        var mailOptions = {
          from: "decisionmakerapp007@zohomail.com",
          to: email,
          subject: `your poll just created`,
          text: `
          Hello ${name}!
          your just created the poll: ${title}. Click below to see the updated results.
          Admin Link: http://localhost:8080/api/results/${poll_key.poll_key}
          Share the link below to your friends to vote.
          Voting Link: http://localhost:8080/api/vote/${poll_key.poll_key}
          Thank you!`,
        };
        transport.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.render('complete', poll_key);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    })
  });
  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM options`)
  //     .then(data => {
  //       const i = data.rows;
  //       res.json({i});
  //     })
  // });
  return router;
};

