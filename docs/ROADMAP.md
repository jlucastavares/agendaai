# Roadmap

## Fase 1 – MVP (uma barbearia usando de verdade)
- [ ] Login do dono (Supabase Auth, e-mail ou Google)
- [ ] Cadastro do negócio (nome + slug)
- [ ] CRUD de serviços (nome, duração, preço)
- [ ] CRUD de profissionais e horários de trabalho
- [ ] Página pública `/[slug]`: serviço → profissional → dia → horário livre → nome/telefone
- [ ] Cálculo de horários livres (expediente − agendamentos existentes)
- [ ] Impedir dois agendamentos no mesmo horário (constraint no banco)
- [ ] Painel: agenda do dia/semana, cancelar/concluir
- [ ] Policies RLS no Supabase
- [ ] Deploy na Vercel

## Fase 2 – Pronto para vender
- [ ] Link "Agendar pelo WhatsApp" e lembrete (WhatsApp/e-mail via Resend)
- [ ] Cliente cancela/remarca pelo link
- [ ] Bloqueio de horários (folga, almoço, feriado)
- [ ] Logo/cor personalizada por negócio
- [ ] Relatórios simples (faturamento, serviços mais vendidos)

## Fase 3 – Monetização
- [ ] Planos e cobrança mensal (Mercado Pago / Stripe / Asaas)
- [ ] Período de teste grátis
- [ ] Domínio próprio
