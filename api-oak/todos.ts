import { RouterContext } from "https://deno.land/x/oak@v6.5.0/mod.ts";

const todos: string[] = ["First task", "Second task", "Third task"];

/* Route handler to get all todo (GET) */
export const getTodos = (ctx: RouterContext) => {
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: todos,
      message: "200:Todos recovered"
    };
};

/* Route handler to get a todo with index (GET) */
export const getTodo = (ctx: RouterContext) => {
    const indexParam = ctx.params.index;
    if (indexParam !== undefined) {
      const index = parseInt(indexParam);
      if (!isNaN(index) && index >= 0 && index < todos.length) {
        const todo = todos[index];
        ctx.response.status = 201;
        ctx.response.body = {
          success: true,
          data: todo,
          message: "201:Todo recovered",
        };
      } else {
        ctx.response.status = 404;
        ctx.response.body = {
          success: false,
          message: "404:Index out of range",
        };
      }
    } else {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "400:Index parameter is missing",
      };
    }
};

/* Route handler to add a todo (POST) */
export const addTodo = async (ctx: RouterContext) => {
    const data = await ctx.request.body().value;
    const newTodo = data.todo;
    todos.push(newTodo);
    ctx.response.status = 202;
    ctx.response.body = {
      success: true,
      data: newTodo,
      message: "202:Todo added",
    };
};

/* Route handler to update a todo with index (UPDATE) */
export const updateTodo = async (ctx: RouterContext) => {
    const indexParam = ctx.params.index;
    if (indexParam !== undefined) {
      const index = parseInt(indexParam);
      if (!isNaN(index) && index >= 0 && index < todos.length) {
        const data = await ctx.request.body().value;
        const updatedTodo = data.todo;
        todos[index] = updatedTodo;
        ctx.response.status = 203;
        ctx.response.body = {
          success: true,
          data: todos[index],
          message: "203:Todo updated",
        };
      } else {
        ctx.response.status = 404;
        ctx.response.body = {
          success: false,
          message: "404:Index out of range",
        };
      }
    } else {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "400:Index parameter is missing",
      };
    }
};

/* Route handler to uelete a todo with index (DELETE) */
export const deleteTodo = (ctx: RouterContext) => {
  const indexParam = ctx.params.index;
  if (indexParam !== undefined) {
    const index = parseInt(indexParam);
    if (!isNaN(index) && index >= 0 && index < todos.length) {
      const delTodo = todos[index];
      todos.splice(index, 1);
      ctx.response.status = 204;
      ctx.response.body = {
        success: true,
        data: delTodo,
        message: "204:Todo deleted",
      };
    } else {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "404:Index out of range",
      };
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "400:Index parameter is missing",
    };
  }
};