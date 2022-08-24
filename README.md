# LHL Decision Maker

## Introduction

A web app that helps groups of friends to vote on a preferred choice (using ranked voting), for example: "What movie should we see next Friday?".<br/>
This App using the Borda Count algorithm to determine rankings.<br/>
Users can create new polls or vote on existing ones. Poll creators recieve email updates via nodemailer. Results are displayed graphically on the poll's result page.<br/>
_**obs**: the email notification is currently disabled\*_

## HOW TO USE IT

1. Npm install the dependencies.
2. Set up a database. <br/>
   _Here is a [article](https://www.microfocus.com/documentation/idol/IDOL_12_0/MediaServer/Guides/html/English/Content/Getting_Started/Configure/_TRN_Set_up_PostgreSQL.htm) to help if needed._
3. Npm start to start the server.

- 4.1 Visit http://localhost:8080/api/users/ in order to go to the main page.<br/>

5. Write your name and your e-mail to create a new Poll. <br/>
   <img src="https://user-images.githubusercontent.com/105023503/186273523-f4162f63-1a9d-44eb-aee0-e9452dbb897a.png" style="width:300px" >

6. Type the title of the poll, add hte number of options needed and the description for each option.
   <img src="https://user-images.githubusercontent.com/105023503/186273965-1e45d5c3-b6de-4114-9272-dbdff8269140.png" style="width:300px" >

7. After creating the Poll you have the option to see the results and share the link of the Poll with your friends so they can vote.
   <img src="https://user-images.githubusercontent.com/105023503/186274153-cec4e8b6-f142-4f9f-bdd0-9bfe7e42bc3c.png" style="width:300px" >

8. In order to vote, you can drag and drop the options. The first one receive the highest points and the last one the least points. You can double click the option in order to see the details bellow the options.<br/>
   <img src="https://user-images.githubusercontent.com/105023503/186274701-98735142-11b7-4626-aa0f-f83313fc477b.png" style="width:300px" >

## Features

1. Simple poll creation: The user does not need to sign up on the app and can easily create a poll on the home page by typing their name and email.
2. Democratic ranking system: Voters can rank their preferences from most preferred to least preferred with a simple drag and drop form.
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
