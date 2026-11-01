// Página pública de agendamento de cada negócio: /barbearia-do-ze
export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold">Agendar em: {slug}</h1>
      <p className="mt-2 text-zinc-600">Em breve: escolher serviço, profissional, data e horário.</p>
    </main>
  );
}
