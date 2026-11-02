import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/(auth)/login/actions";

// Tudo dentro de /painel passa por aqui: sem usuário logado, volta para /login.
// (O proxy já faz esse redirecionamento; esta checagem é uma segunda camada de segurança.)
export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims?.email as string | undefined;

  if (!data?.claims) redirect("/login");

  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/painel" className="text-lg font-bold">
            AgendaAí
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-zinc-600 sm:inline">{email}</span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-zinc-300 px-3 py-1.5 hover:bg-zinc-100"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
