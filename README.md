# Todo List project with Deno and React

[![Deno](https://img.shields.io/badge/Deno%20-%20v1.43.1%20-%20%239acd32)](https://deno.com/)
[![Oak](https://img.shields.io/badge/Oak%20-%20v6.5.0%20-%20%23cd5c5c)](https://deno.land/x/oak@v6.5.0)
[![React](https://img.shields.io/badge/React%20-%20v18.3.1%20-%20%2300ced1)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL%20-%20v2.11.0%20-%20%23daa520)](https://deno.land/x/mysql@v2.11.0)

This project is a Todo List testing application developed using [Deno](https://deno.com/) for the back-end part (API) and [React](https://react.dev/) for the front-end, connected to a database [MySQL](https://deno.land/x/mysql).

## Features
- Add a task to the list
- View all tasks in the list
- Remove a task from the list

## Project Structure
- api-oak/: Contains the Deno API files.
- interface-react/: Contains the React user interface files.
- bd-mysql/: Contains the files used to initialize the MySQL database.

## Prerequisites
- Deno must be installed : [Deno Installation Guide](https://docs.deno.com/runtime/manual/getting_started/installation).
- Node.js and npm must be installed to run React : [Node.js and npm Installation Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Have access to a local or remote MySQL database to store the list tasks : [MySQL Installation Guide](https://www.javatpoint.com/how-to-install-mysql)

## Installation and Use
1. Clone this repository on your machine :
#### `git clone https://github.com/Estia-1a/tuto-todo.git`
2. Navigate to the project directory :
#### `cd tuto-todo`
3. Configure your MySQL database connection information in the `bd-mysql/database.ts` file.
4. Install Deno API dependencies :
#### `deno cache --unstable --reload --lock=lock.json --lock-write api-oak/server.ts`
5. Launch the Todo List API by running the server.ts file :
#### `deno run --allow-net --allow-read api-oak/server.ts`
6. Navigate to the React directory :
#### `cd interface-react`
7. Install React dependencies :
#### `npm install`
8. Launch React :
#### `npm start`
9. Go to **http://localhost:3000** and $\color{#D29922}\textsf{✨magiiic✨}$.
