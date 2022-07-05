/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let poll_key = { poll_key: req.params.key };
    const voteUrl = `api/vote/${poll_key}`;
    const resultUrl = `api/result/${poll_key}`;
    const templateVariables = {voteUrl, resultUrl}
    res.render("submissionlanding", templateVariables)
  });
  return router;
};
