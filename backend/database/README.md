# Database
This project uses a [MySQL](https://deno.land/x/mysql@v2.11.0) database to store the todos and user information.

## Structure
The **db_todos** database is made up of two tables whose structure is as follows :
### Tables
#### todo
```
CREATE TABLE IF NOT EXISTS todo (
            id int(5) NOT NULL AUTO_INCREMENT,
            title varchar(255) NOT NULL,
            user_id int(5) NOT NULL,
            PRIMARY KEY (id),
            foreign key (user_id) references github (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
#### user
```
 CREATE TABLE github (
            id int(10) UNIQUE NOT NULL,
            login varchar(255) NOT NULL,
            url_avatar varchar(255) NOT NULL,
            url_profil varchar(255) NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
## Database connection
Ensure to provide the database connection information in the .env file of the project. The required environment variables are :
- DB_HOSTNAME - The hostname of the MySQL server
- DB_USERNAME - The username to connect to the MySQL server
- DB_NAME - The name of the MySQL database
- DB_PASSWORD - The password to connect to the MySQL server
