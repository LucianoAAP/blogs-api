# The project

This is a slightly modified version of a back-end project I had to develop during my studies at the "Trybe" web development course. It is a Node API with which you can make CRUD operations for a blog. This project was made using Express.js and MySQL and uses Sequelize as an object relational mapper to consult and manipulate the database.

# Features

- [x] user signup endpoint
- [x] user login endpoint
- [x] user listing endpoint
- [x] user deletion endpoint
- [x] specific user visualization endpoint
- [x] category creation endpoint
- [x] categories listing endpoint
- [x] post creation endpoint
- [x] posts listing endpoint
- [x] posts search endpoint
- [x] specific post visualization endpoint
- [x] post editing endpoint
- [x] post deletion endpoint

# Getting started

This project requires Node.js and MySQL.

## Installation

1. First, clone the repository:
- `git clone git@github.com:LucianoAAP/blogs-api.git`
2. Then, enter the repository:
- `cd blogs-api`
3. Finally, install dependencies:
- `npm install`

## Starting the application

1. First, drop the database if it already exists:
- `npm run drop`
2. Then, create the database and the tables
- `npm run prestart`
3. Then, populate the tables
- `npm run seed`
4. Finally, start the application
- `npm start`