LHL Decision Maker
=========

## Introduction

A web app that helps groups of friends to vote on a preferred choice (using ranked voting), for example: "What movie should we see next Friday?".

This App using the Borda Count algorithm to determine rankings. Built with Node, Express, PostgresSQL, jQuery.

Users can create new polls or vote on existing ones. Poll creators recieve email updates via nodemailer. Results are displayed graphically on the poll's result page.

## Features

1. Simple poll creation: The user does not need to sign up on the app and can easily create a poll on the home page by typing their name and email.
2. Democratic ranking system: Voters can rank their preferences from most preferred to least preferred with a simple drag and drop form
3. Results: The app uses Borda Count to rank voter preferences.
4. Poll transparency: Both the admin and the voter can see the results immediately after voting.
5. Email features: The creator can view the calculated results, the poll he created by click the link in the email.

## Dependencies


- chalk: 2.4.2
- dotenv: 2.0.0
- ejs: 2.6.2
- express: 4.17.1
- morgan: 1.9.1
- nodemailer: 6.7.6
- pg: 8.5.0
- sass: 1.35.1
