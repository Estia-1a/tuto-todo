# Todo List project with Deno

[![Deno](https://img.shields.io/badge/Deno%20-%20v1.43.1%20-%20%239acd32)](https://deno.com/)
[![Oak](https://img.shields.io/badge/Oak%20-%20v6.5.0%20-%20%23cd5c5c)](https://deno.land/x/oak@v6.5.0)
[![Fresh](https://img.shields.io/badge/v1.6.8-yellow?label=Fresh)](https://fresh.deno.dev)
[![MySQL](https://img.shields.io/badge/v2.11.0-blue?label=MySQL)](https://deno.land/x/mysql@v2.11.0)

This project is a Todo List testing application developed with [Deno](https://deno.com/) using the framework [Oak](https://deno.land/x/oak@v6.5.0) for the back-end part (API) and the framework [Fresh](https://fresh.deno.dev/) for the front-end, connected to a database [MySQL](https://deno.land/x/mysql).

## Features
- **Authentication**: Users can log in using their GitHub accounts.
- **Profile Access**: Once logged in, users have access to their profile.
- **Task Management**: Users can view, add, and remove tasks from the list.

## Project Structure
- **backend/**: Contains the Deno API files and database configurations.
- **fresh-project/**: Contains the Fresh user interface files.

## Prerequisites
- Access to a local or remote MySQL database: [MySQL Installation Guide](https://www.javatpoint.com/how-to-install-mysql)

## Installation and Use
1. Clone this repository on your machine:
#### `git clone https://github.com/Estia-1a/tuto-todo.git`
2. Navigate to the project directory:
#### `cd tuto-todo`
3. Configure the environment variables in the `.env` files:
- **/.env**:
```
# Database connection information
DB_HOSTNAME=127.0.0.1
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=database

# GitHub Auth Clerk Application information
GITHUB_CLIENT_ID=0000
GITHUB_CLIENT_SECRET=0000
```
- **/fresh-projet/.env**:
```
# GitHub Auth Clerk Application information
GITHUB_CLIENT_ID=0000
GITHUB_CLIENT_SECRET=0000
```
4. Install Deno API dependencies:
#### `deno cache --unstable --reload --lock=lock.json --lock-write backend/server.ts`
5. Launch the Todo List API by running the server.ts file:
#### `deno run --allow-net --allow-read --allow-env backend/server.ts`
6. Navigate to the Fresh directory:
#### `cd fresh-project`
7. Launch Fresh:
#### `deno task start`
8. Visit **http://localhost:8000** and $\color{#D29922}\textsf{✨magiiic✨}$.
