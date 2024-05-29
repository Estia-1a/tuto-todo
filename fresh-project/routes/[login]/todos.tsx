/** @jsxImportSource preact */
import { Handlers, PageProps } from "$fresh/server.ts";
import ToDoList from "../../islands/ToDoList.tsx";

interface Todo {
  id: number;
  title: string;
  user_id: number;
}

interface Data {
  todos: Todo[];
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const resp = await fetch("http://localhost:3000/todos");
    if (!resp.ok) {
      console.error("Failed to fetch todos:", resp.statusText);
      return ctx.render({ todos: [] });
    }
    const todos: Todo[] = await resp.json();
    return ctx.render({ todos });
  },
};

export default function Page(props: PageProps<Data>) {
  const { todos } = props.data;

  return (
    <div class="container px-4 py-8 mx-auto">
      <ToDoList todos={todos} />
    </div>
  );
}
