/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');


module.exports = (db) => {
  router.get("/:key", (req, res) => {
    let poll_key = { poll_key: req.params.key };
    console.log(poll_key);
    db.query(`SELECT titles.title, options.choice,options.description
    FROM options
    JOIN users ON users.id = options.user_id
    JOIN titles ON users.id = titles.user_id
    WHERE users.poll_key = $1;`, [poll_key.poll_key])
    .then(data => {
        const title = data.rows[0].title;
        let question = [];
        let description=[];
        for (const i of data.rows) {
          question.push(i.choice);
          description.push(i.description);
        }
        console.log(title);
        console.log(question);
        const info = {title:title, questions: question, description:description, poll_key: req.params.key };
        console.log(info);
        //res.json({ info });
        res.render("vote",info);
    })
  });

  router.post("/:key", (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let poll_key = {poll_key:req.params.key};
    let options = req.body.op;
    let descriptions = req.body.description;

    db.query(`SELECT email FROM users
    WHERE users.poll_key = $1;`,[poll_key.poll_key])
    .then(data => {
      const email = data.rows[0].email;
      console.log(email);

      var transport = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, //ssl
        auth: {

            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'decisionmakerapp007@zohomail.com',
        to: email,
        subject: `your friends just voted on your poll`,
        text: `
        Hello!
        your friend has just voted on your poll: ${title}. Click below to see the updated results.
        Admin Link: http://localhost:8080/api/result/${poll_key.poll_key}
        Share the link below to get more responses.
        Voting Link: http://localhost:8080/api/vote/${poll_key.poll_key}
        Thank you!`
    };

    transport.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });






    })


  });

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM options`)
      .then(data => {
        const i = data.rows;
        res.json({ i });
      })
  });

  return router;
};

