import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-bold">AgendaAí</h1>
      <p className="text-zinc-600">
        Agendamento online para barbearias, salões e pequenos negócios.
      </p>
      <Link
        href="/login"
        className="rounded-lg bg-zinc-900 px-5 py-2.5 font-medium text-white hover:bg-zinc-700"
      >
        Entrar no painel
      </Link>
    </main>
  );
}
