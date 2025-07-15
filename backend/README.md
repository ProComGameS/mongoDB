# Express Sessions Practice

This project demonstrates how to:

- Serve a favicon using Express and Pug
- Apply light/dark themes using cookies
- Store and display a username using express-session
- Render article data using Pug templates

## Setup

1. Install dependencies

   npm install

2. Start the server

   node express.js

## Routes

- /articles  
  Displays list of articles

- /articles/:articleid  
  Displays a single article

- /toggle-theme  
  Toggles between light and dark themes using a cookie

- /set-name/:name  
  Saves the username in the session

- /get-name  
  Displays the saved username

## Technologies

- Node.js
- Express
- express-session
- cookie-parser
- Pug
