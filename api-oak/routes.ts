import { Router } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import { addTodo, deleteTodo, getTodo, getTodos, updateTodo } from "./todos.ts";

const router = new Router();

// Define routes
router.get("/todos", getTodos);
router.get("/todos/:index", getTodo);
router.post("/todos", addTodo);
router.put("/todos/:index", updateTodo);
router.delete("/todos/:index", deleteTodo);

export default router;
