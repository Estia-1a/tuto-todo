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
  id: string;
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    console.log(id);
    const resp = await fetch(`http://localhost:3000/todos/${id}`);
    if (!resp.ok) {
      console.error("Failed to fetch todos:", resp.statusText);
      return ctx.render({ todos: [], id });
    }
    const todos: Todo[] = await resp.json();
    return ctx.render({ todos, id });
  },
};

export default function Page(props: PageProps<Data>) {
  const { todos, id } = props.data;

  return (
    <div class="container px-4 py-8 mx-auto">
      <ToDoList todos={todos} id={id} />
    </div>
  );
}
