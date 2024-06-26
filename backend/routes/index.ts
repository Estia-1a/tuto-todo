import { Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { addTodo, deleteTodo, getUserTodos, getTodos, updateTodo } from "../handlers/todos.ts";
import { createUser, getUserData } from "../handlers/users.ts";
import { redirectToGitHubLogin, handleGitHubCallback } from "../handlers/github.ts";

const router = new Router();

// Define routes for todo
router.get("/todos", getTodos);
router.get("/todos/:user_id", getUserTodos);
router.post("/todos", addTodo);
router.put("/todos/:index", updateTodo);
router.delete("/todos/:index", deleteTodo);

// Define routes for user
router.post("/user/register", createUser);
router.get("/user/:id",getUserData)

// Define routes for GitHub OAuth
router.get("/auth/github", redirectToGitHubLogin);
router.get("/auth/github/callback", handleGitHubCallback);

export default router;