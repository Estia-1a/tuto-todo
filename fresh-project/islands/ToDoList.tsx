/** @jsxImportSource preact */
import { useState, useEffect } from "preact/hooks";

interface Todo {
  id: number;
  title: string;
  user_id: number;
}

interface ToDoListProps {
  todos: Todo[];
  id: string;
}

export default function ToDoList({ todos, id }: ToDoListProps) {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState(todos);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const handleAddTodo = async () => {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo, user: id }),
    });
  
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.success) {
        const addedTodo: Todo = { id: todoList.length + 1, title: responseData.data, user_id: parseInt(id) }; 
        setTodoList([...todoList, addedTodo]);
        setNewTodo("");
      } else {
        console.error("Failed to add todo:", responseData.message); 
      }
    } else {
      console.error("Failed to add todo:", response.statusText);
    }
  };
  
  const handleDeleteTodo = async (id: number) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } else {
      console.error("Failed to delete todo:", response.statusText);
    }
  };

  return (
    <div class="container px-4 py-8 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center border p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-[#02283b] md:text-4xl lg:text-5xl dark:text-white">
          My To-Do List
        </h1>
        <ul class="w-full">
          {todoList.map((todo) => (
            <li
              key={todo.id}
              class="border-b py-2 flex justify-between items-center"
            >
              <span>{todo.title}</span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                class="text-red-500"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div class="mt-4 w-full">
          <input
            type="text"
            value={newTodo}
            onInput={(e) => setNewTodo(e.currentTarget.value)}
            class="border rounded p-2 w-full"
            placeholder="Add a new todo"
          />
          <button
            onClick={handleAddTodo}
            class="mt-2 w-full bg-blue-500 text-white py-2 rounded"
          >
            Add Todo
          </button>
          <p>
            <a href="profile" class="text-left">↩Back</a>
          </p>
        </div>
      </div>
    </div>
  );
}
