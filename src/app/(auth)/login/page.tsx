import { LoginForm } from "./login-form";

// Login e cadastro do dono do negócio (Supabase Auth)
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const initialError =
    error === "link-invalido" ? "Link de confirmação inválido ou expirado." : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <LoginForm initialError={initialError} />
    </main>
  );
}
