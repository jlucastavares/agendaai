"use client";

import { useActionState, useState } from "react";
import { login, signup } from "./actions";

export function LoginForm({ initialError }: { initialError?: string }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginState, loginAction, loginPending] = useActionState(login, undefined);
  const [signupState, signupAction, signupPending] = useActionState(signup, undefined);

  const isLogin = mode === "login";
  const state = isLogin ? loginState : signupState;
  const pending = isLogin ? loginPending : signupPending;
  const error = state?.error ?? (isLogin ? initialError : undefined);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">{isLogin ? "Entrar" : "Criar conta"}</h1>
      <p className="mt-1 text-sm text-zinc-500">
        {isLogin ? "Acesse o painel do seu negócio." : "Comece a receber agendamentos online."}
      </p>

      <form action={isLogin ? loginAction : signupAction} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          E-mail
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-lg border border-zinc-300 px-3 py-2 font-normal outline-none focus:border-zinc-900"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Senha
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={isLogin ? "current-password" : "new-password"}
            className="rounded-lg border border-zinc-300 px-3 py-2 font-normal outline-none focus:border-zinc-900"
          />
        </label>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        {state?.message && (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
        >
          {pending ? "Aguarde..." : isLogin ? "Entrar" : "Criar conta"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode(isLogin ? "signup" : "login")}
        className="mt-4 w-full text-center text-sm text-zinc-600 hover:underline"
      >
        {isLogin ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}
      </button>
    </div>
  );
}
