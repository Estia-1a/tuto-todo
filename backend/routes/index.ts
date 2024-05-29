import { Router } from "https://deno.land/x/oak/mod.ts";
import { addTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todos.ts";
import { createUser } from "../controllers/users.ts";
import { redirectToGitHubLogin, handleGitHubCallback } from "../services/github.ts";

const router = new Router();

// Define routes for todo
router.get("/todos", getTodos);
router.get("/todos/:index", getTodo);
router.post("/todos", addTodo);
router.put("/todos/:index", updateTodo);
router.delete("/todos/:index", deleteTodo);

// Define routes for user
router.post("/register", createUser);

// Define routes for GitHub OAuth
router.get("/auth/github", redirectToGitHubLogin);
router.get("/auth/github/callback", handleGitHubCallback);

export default router;