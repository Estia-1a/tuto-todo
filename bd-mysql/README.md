# Database in MySQL
This project uses a [MySQL](https://deno.land/x/mysql@v2.11.0) database to store the task list.

## Structure
Table todos
| id | todo |
| --- | ----------- |
| 1 | Todo 1 |
| 2 | Todo 2 |
| ... | ... |

## Database configuration
1. Creation of the bd_todos database:
You can use MySQL Workbench locally if you want.
2. Configuring Deno API:
In the database.ts file, configure connection information to your local or remote MySQL database.
Then the scripts will create a todos table and add three todos examples.