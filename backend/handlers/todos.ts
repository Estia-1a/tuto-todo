// deno-lint-ignore-file no-explicit-any
import client from "../database/database.ts";

// Route handler to get all todos (GET)
export const getTodos = async (ctx: any) => {
  try {
    const result = await client.query(`SELECT * FROM todo`);
    ctx.response.body = result;
  } catch (_error) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
  }
};

// Route handler to get user data with id (GET)
export const getUserTodos = async (ctx: any) => {
  const indexParam = ctx.params.user_id;
  if (indexParam !== undefined) {
    const index = parseInt(indexParam);
    if (!isNaN(index) && index >= 0) {
      try {
        const result = await client.query(`SELECT * FROM todo WHERE user_id = ?`,
        [index],);
    ctx.response.body = result;
          return;
        }
     catch (error) {
        console.error(error);
        ctx.response.status = 500;
        ctx.response.body = {
          success: false,
          message: "Internal Server Error",
        };
        return;
      }
    } else {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "Invalid index parameter",
      };
      return;
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "Index parameter is missing",
    };
    return;
  }
};

// Route handler to add a todo (POST)
export const addTodo = async (ctx: any) => {
  try {
    const data = await ctx.request.body().value;
    const newTodo = data.title;
    const user = data.user;

    const _result = await client.execute(
      `INSERT INTO db_todos.todo (title, user_id) VALUES (?, ?)`,
      [newTodo, user],
    );

    ctx.response.status = 202;
    ctx.response.body = {
      success: true,
      data: newTodo,
      message: "Todo added",
    };
  } catch (error) {
    console.error(error);
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: "Internal Server Error",
    };
  }
};

// Route handler to update a todo with index (UPDATE)
export const updateTodo = async (ctx: any) => {
  const indexParam = ctx.params.index;
  if (indexParam !== undefined) {
    const index = parseInt(indexParam);
    if (!isNaN(index) && index >= 0) {
      try {
        const data = await ctx.request.body().value;
        const updatedTodo = data.todo;

        const result = await client.execute(
          `UPDATE db_todos.todo SET title = ? WHERE id = ?`,
          [updatedTodo, index],
        );

        if (
          result && result.affectedRows !== undefined && result.affectedRows > 0
        ) {
          ctx.response.status = 203;
          ctx.response.body = {
            success: true,
            data: updatedTodo,
            message: "Todo updated",
          };
        } else {
          ctx.response.status = 404;
          ctx.response.body = {
            success: false,
            message: "Todo not found or not updated",
          };
        }
      } catch (error) {
        console.error(error);
        ctx.response.status = 500;
        ctx.response.body = {
          success: false,
          message: "Internal Server Error",
        };
      }
    } else {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "Invalid index parameter",
      };
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "Index parameter is missing",
    };
  }
};

// Route handler to uelete a todo with index (DELETE)
export const deleteTodo = async (ctx: any) => {
  const indexParam = ctx.params.index;
  if (indexParam !== undefined) {
    const index = parseInt(indexParam);
    if (!isNaN(index) && index >= 0) {
      try {
        const result = await client.execute(
          `DELETE FROM db_todos.todo WHERE id = ?`,
          [index],
        );

        if (
          result && result.affectedRows !== undefined && result.affectedRows > 0
        ) {
          ctx.response.status = 204;
          ctx.response.body = {
            success: true,
            message: "Todo deleted",
          };
        } else {
          ctx.response.status = 404;
          ctx.response.body = {
            success: false,
            message: "Todo not found",
          };
        }
      } catch (error) {
        console.error(error);
        ctx.response.status = 500;
        ctx.response.body = {
          success: false,
          message: "Internal Server Error",
        };
      }
    } else {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "Invalid index parameter",
      };
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "Index parameter is missing",
    };
  }
};
