# Backend

This Todo List API is developed using [Deno](https://deno.com/) and [Oak](https://deno.land/x/oak@v6.5.0) to create a CRUD service (Create, Read, Update, Delete) using a MySQL database

## Features : 
### TODOS
- GET all todos `http://localhost:3000/todos`
- GET a specific todo: `http://localhost:3000/todos/:index`
- POST a new todo: `http://localhost:3000/todos` with JSON body
- PUT to update a todo: `http://localhost:3000/todos/:index` with JSON body
- DELETE a todo: `http://localhost:3000/todos/:index`
### USERS
- Register a new user: `http://localhost:3000/register` with JSON body
### GITHUB AUTH
- Redirect to GitHub API for authentication: `http://localhost:3000/auth/github`
- Handle GitHub callback and retrieve user data: `http://localhost:3000/github/callback`

## Structure :
- /database
  - Contains all files related to the database setup and queries
- /handlers
  - Contains functions that handle the logic for different routes
- /routes
  - Defines the API routes and links them to their respective handlers
- server.ts
  - The main entry point of the application that sets up and starts the server
