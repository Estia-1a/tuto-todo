import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface LogIn {
}

export default function Counter(props: LogIn) {
  return (
    <div class="flex gap-8 py-6">
      <a href="./api/auth">
      <Button>Se connecter</Button>
      </a>
    </div>
  );
}
