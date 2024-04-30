import { Application, Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";

const app = new Application();
const router = new Router();

const todos: string[] = ["Première tache", "Deuxième tache", "Troisième tache"];

// Middleware to log requests
app.use(async (ctx, next) => {
  await next();
  console.log(`${ctx.request.method} ${ctx.request.url}`);
});

// Get all todos
router.get('/todos', (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    data: todos,
    message: "200:Todos recovered" 
  };
});

// Get a todo with index
router.get('/todos/:index', (ctx) => {
  const indexParam = ctx.params.index;
  if (indexParam !== undefined) {
    const index = parseInt(indexParam);
    if (!isNaN(index) && index >= 0 && index < todos.length) {
      const todo = todos[index];
      ctx.response.status = 201;
  ctx.response.body = {
    success: true,
    data: todo,
    message: "201:Todo recovered" 
  };
    } else {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "404:Index out of range" 
      };
    }
  } else {
    ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "400:Index parameter is missing" 
      };
  }
});


// Add a todo
router.post('/todos', async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo = data.todo;
  todos.push(newTodo);
  ctx.response.status = 202;
  ctx.response.body = {
    success: true,
    data: newTodo,
    message: "202:Todo added" 
  };
});

// Update a todo with index
router.put('/todos/:index', async (ctx) => {
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
        message: "203:Todo updated" 
      };
    } else {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "404:Index out of range" 
      };
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "400:Index parameter is missing" 
    };
  }
});

// Delete a todo with index
router.delete('/todos/:index', (ctx) => {
  const indexParam = ctx.params.index;
  if (indexParam !== undefined) {
    const index = parseInt(indexParam);
    if (!isNaN(index) && index >= 0 && index < todos.length) {
      let delTodo = todos[index];
      todos.splice(index, 1);
      ctx.response.status = 204;
      ctx.response.body = { 
        success: true,
        data: delTodo,
        message: "204:Todo deleted"
      };
    } else {
      ctx.response.status = 404; // Not Found
      ctx.response.body = { 
        success: false,
        message: "404:Index out of range"
      };
    }
  } else {
    ctx.response.status = 400; // Bad Request
    ctx.response.body = { 
      success: false,
      message: "400:Index parameter is missing"
    };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server is running on http://localhost:8000');

await app.listen({ port: 8000 });
