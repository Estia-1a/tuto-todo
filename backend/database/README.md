# Database in MySQL
This project uses a [MySQL](https://deno.land/x/mysql@v2.11.0) database to store the todos.

## Structure
The **db_todos** database is made up of only one **todos** table whose structure is as follows :

| id | todo |
| --- | ----------- |
| 1 | Feed the ewes |
| 2 | Repair the wings of the mill |
| 3 | Cook a good cassoulet for tomorrow |
| ... | ... |

## Database configuration
1. Creation of the **db_todos** database :
You can use MySQL Workbench locally if you want.
2. Configuring Deno API :
In the **database.ts** file, configure connection information to your local or remote MySQL database.
Then the scripts will create a todos table and add three todos examples.
