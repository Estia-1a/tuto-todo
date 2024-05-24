/** @jsxImportSource preact */
import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import LogIn from "../islands/LogIn.tsx";

export const handler: Handlers = {
  GET(_, ctx) {
    return ctx.render();
  },
};

export default function Home(props: PageProps) {
  return (
    <div class="container px-4 py-8 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center border p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <img
          class="my-6"
          src="/logo.png"
          width="150"
          height="150"
          alt="the Classroom logo: a mortarboard forward a sun"
        />
        <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-[#02283b] md:text-4xl lg:text-5xl dark:text-white">
          Classroom Clerk
        </h1>
        <p class="text-center mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          A web portal allowing ESTIA professors to follow the progress of
          student groups for IT projects hosted on GitHub
        </p>
        <LogIn />
      </div>
    </div>
  );
}
