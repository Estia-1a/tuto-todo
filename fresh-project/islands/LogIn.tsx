import { Button } from "../components/Button.tsx";

export default function LogIn() {
  return (
    <div class="flex gap-8 py-6">
      <a href="./api/auth">
      <Button>Se connecter</Button>
      </a>
    </div>
  );
}
