/** @jsxImportSource preact */
import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_, ctx) {
    return ctx.render();
  },
};

export default function ToDoList(props: PageProps) {
  return (
    <div class="container px-4 py-8 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center border p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-[#02283b] md:text-4xl lg:text-5xl dark:text-white">
          My To-Do List
        </h1>
        <p>
          <a class="text-left" href="{javascript:history.back()}">Retour</a>
        </p>
      </div>
    </div>
  );
}
