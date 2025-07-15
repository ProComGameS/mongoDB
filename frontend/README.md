# React + Express Authentication App

This project demonstrates full-stack user authentication using React, Vite, TypeScript on the frontend, and Express with Passport on the backend.

## Features

- Local authentication with email and password
- Bcrypt hashing for secure password storage
- Session-based login handling with express-session
- Secure cross-origin communication between frontend and backend using cookies
- Registration support from the React frontend using Axios
- Automatic login after successful registration
- MongoDB Atlas integration using the mongodb driver
- Dynamic user storage and lookup via MongoDB
- Axios integration in React for API communication
- Theme switching (light/dark) via cookies
- Article viewer rendered using Pug templates
- Personalized greetings via session-stored username
- Protected route access only for authenticated users
- Profile component displaying current login state and authentication controls

## Tech Stack

- Frontend: React, TypeScript, Vite, Axios
- Backend: Node.js, Express, Passport (passport-local), bcrypt
- Database: MongoDB Atlas (via native mongodb driver)
- Templating: Pug
- Sessions: express-session with cookie management

## Folder Structure

- backend: Express app (routes, Passport setup, Pug views)
- frontend: React app (pages, hooks, components, Axios instance)
- public: Static assets like favicon and styles

## How to Run Locally

1. Clone the project

2. Install backend dependencies

   cd backend
   npm install

3. Set up MongoDB Atlas connection credentials in .env

   DB_USER=yourMongoUser
   DB_PASSWORD=yourMongoPassword

4. Start the Express server

   npm start

5. Install frontend dependencies

   cd frontend
   npm install

6. Run the React frontend

   npm run dev

7. Access the site at

   React app: http://localhost:5173  
   Express server: http://localhost:3000

## Default User

- Email: test@example.com
- Password: 123456somepassword

## Notes

- Passwords are hashed with bcrypt before being saved in MongoDB
- Passport validates user credentials against stored hashes
- React frontend sends all requests with credentials enabled
- MongoDB Atlas stores registered users in the users collection
- The profile component enables login, logout, and registration from the same UI
