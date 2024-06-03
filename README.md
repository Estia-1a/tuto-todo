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
* Git: [Download and install Git](https://git-scm.com/downloads)
* Deno: [Download and install Deno](https://docs.deno.com/runtime/manual/getting_started/installation)
* Database Server: [Ensure you have a database server (e.g., MySQL) running](https://www.javatpoint.com/how-to-install-mysql).

## Installation & Configuration
For detailed installation and configuration instructions, please refer to the [Installation & Configuration Guide](https://github.com/Estia-1a/tuto-todo/wiki/Installation-&-Configuration-Guide) on the wiki.

## Quick Start
1. Launch your database server
2. Launch the Todo List API by running the server.ts file:
#### `deno run --allow-net --allow-read --allow-env backend/server.ts`
3. Navigate to the Fresh directory:
#### `cd fresh-project`
4. Launch Fresh:
#### `deno task start`
5. Visit **http://localhost:8000** and $\color{#D29922}\textsf{✨magiiic✨}$.
