# Todo List project with Deno and React
This project is a Todo List testing application developed using [Deno](https://deno.com/) for the back-end part (API) and [React](https://react.dev/) for the front part -end (user interface), connected to a database [MySQL](https://deno.land/x/mysql@v2.11.0).

## Features
- Add a task to the list
- View all tasks in the list
- Remove a task from the list

## Project Structure
- api-oak/: Contains the Deno API files.
- interface-react/: Contains the React user interface files.
- bd-mysql/: Contains the files used to initialize the MySQL database.

## Prerequisites
- Deno must be installed on your machine. Please see the official Deno documentation for installation instructions: [Deno Installation Guide](https://docs.deno.com/runtime/manual/getting_started/installation)
- Node.js and npm must be installed on your machine to run React UI.
- Make sure you have access to a local or remote MySQL database to store the list tasks.

## Installation and Use
1. Clone this repository on your machine:
#### `git clone https://github.com/Estia-1a/tuto-todo.git`
2. Navigate to the project directory:
#### `cd tuto-todo`
3. Configure your MySQL database connection information in the `database.ts` file.
4. Install Deno API dependencies:
#### `deno cache --unstable --reload --lock=lock.json --lock-write server.ts`
5. Launch the Todo List API by running the server.ts file:
#### `deno run --allow-net --allow-read server.ts`
6. Navigate to the React UI directory:
#### `client cd`
7. Install React UI dependencies:
`npm install`
8. Launch the React UI:
`npm start`
9. Go to **http://localhost:3000** and **magiiic**.