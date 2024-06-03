import { Button } from "../components/Button.tsx";

export default function LogIn() {
  return (
    <div class="flex gap-8 py-6">
      <a href="./api/auth">
      <Button>Log In</Button>
      </a>
    </div>
  );
}
