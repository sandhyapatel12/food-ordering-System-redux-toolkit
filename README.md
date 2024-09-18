# Food-ordering-System

Foodie's Haven is a modern and user-friendly food ordering platform designed to simplify the way customers order their favorite meals online. Whether you're a busy professional or a food enthusiast, this platform provides a seamless experience for browsing menus, placing orders, and enjoying delicious dishes from local restaurants.

## Functionality

- User Registration and Login
- Login with socials(like google, faceBook, instagram)
- Filter menus categories wise
- Search specific food
- cart Management
- display logged in user profile
- payment gateway
    `npm i @stripe/react-stripe-js`

##  we need to run frontend and backend both at a time so here use concurrently at root

`npm i concurrently`

then add following scripts into package.json file at root

  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd backend && nodemon app.js",
    "client": "cd frontend && npm start"

  }

## start app

`npm start`

# backend

1. `npm init -y`

    