# Todo List API with Deno

This Todo List API is developed using [Deno](https://deno.com/) and [Oak](https://deno.land/x/oak@v6.5.0) to create a CRUD service (Create, Read, Update, Delete) allowing you to manage a task list.

## Features
- Add a task to the list
`GET /todos`
- Retrieve all tasks from the list
`GET /todos/:index`
- Retrieve a specific task by its index in the list
```
POST /todos
{ "todo": "New task" }
```
- Update an existing task in the list (not implemented in the interface)
```
PUT /todos/:index
{ "todo": "Task updated" }
```
- Remove a task from the list
`DELETE /todos/:index`