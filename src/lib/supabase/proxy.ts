// Renova a sessão do Supabase a cada requisição e protege rotas privadas.
// É chamado pelo src/proxy.ts (no Next 16, "proxy" substituiu o antigo "middleware").
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/painel"];
const AUTH_ROUTES = ["/login"];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet, headers) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
          Object.entries(headers ?? {}).forEach(([key, value]) =>
            response.headers.set(key, value)
          );
        },
      },
    }
  );

  // IMPORTANTE: não coloque código entre createServerClient e getClaims().
  // getClaims() valida o token e, se preciso, renova a sessão (gravando novos cookies).
  const { data } = await supabase.auth.getClaims();
  const isLoggedIn = Boolean(data?.claims);
  const path = request.nextUrl.pathname;

  // Não logado tentando acessar rota privada -> /login
  if (!isLoggedIn && PRIVATE_ROUTES.some((r) => path.startsWith(r))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Já logado tentando abrir /login -> /painel
  if (isLoggedIn && AUTH_ROUTES.some((r) => path.startsWith(r))) {
    const url = request.nextUrl.clone();
    url.pathname = "/painel";
    return NextResponse.redirect(url);
  }

  return response;
}
