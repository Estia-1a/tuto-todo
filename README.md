# Todo List project with Deno

[![Deno](https://img.shields.io/badge/Deno%20-%20v1.43.1%20-%20%239acd32)](https://deno.com/)
[![Oak](https://img.shields.io/badge/Oak%20-%20v6.5.0%20-%20%23cd5c5c)](https://deno.land/x/oak@v6.5.0)
[![Fresh](https://img.shields.io/badge/v1.6.8-yellow?label=Fresh)](https://fresh.deno.dev)
[![MySQL](https://img.shields.io/badge/v2.11.0-blue?label=MySQL)](https://deno.land/x/mysql@v2.11.0)

This project is a Todo List testing application developed with [Deno](https://deno.com/) using the framework [Oak](https://deno.land/x/oak@v6.5.0) for the back-end part (API) and the framework [Fresh](https://fresh.deno.dev/) for the front-end, connected to a database [MySQL](https://deno.land/x/mysql).

## Features
- Authentification with GitHub
- Access to the profil
- View all tasks in the list
- Add a task to the list
- Remove a task from the list

## Project Structure
- backend /: Contains the Deno API files and database.
- fresh-project /: Contains the Fresh user interface files.

## Prerequisites
- Deno must be installed : [Deno Installation Guide](https://docs.deno.com/runtime/manual/getting_started/installation).
- Node.js and npm must be installed to run React : [Node.js and npm Installation Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Have access to a local or remote MySQL database to store the list tasks : [MySQL Installation Guide](https://www.javatpoint.com/how-to-install-mysql)

## Installation and Use
1. Clone this repository on your machine :
#### `git clone https://github.com/Estia-1a/tuto-todo.git`
2. Navigate to the project directory :
#### `cd tuto-todo`
3. Configure your MySQL database connection information in a `.env` file.
4. Install Deno API dependencies :
#### `deno cache --unstable --reload --lock=lock.json --lock-write api-oak/server.ts`
5. Launch the Todo List API by running the server.ts file :
#### `deno run --allow-net --allow-read --allow-env api-oak/server.ts`
6. Navigate to the React directory :
#### `cd interface-react`
7. Install React dependencies :
#### `npm ci`
8. Launch React :
#### `npm start`
9. Go to **http://localhost:3000** and $\color{#D29922}\textsf{✨magiiic✨}$.
