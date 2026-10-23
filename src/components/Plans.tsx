import { Check } from "lucide-react";
import Lines, { Rise } from "./Lines";
import CountUp from "./CountUp";
import { waLink } from "../lib";

// Valores provisórios — trocar pelos planos reais da INET
const plans = [
  { speed: 400, unit: "Mega", price: "89,90", perks: ["Wi-Fi 6", "Instalação grátis", "Sem franquia"] },
  { speed: 700, unit: "Mega", price: "109,90", perks: ["Wi-Fi 6", "Instalação grátis", "Sem franquia"], featured: true },
  { speed: 1, unit: "Giga", price: "149,90", perks: ["Wi-Fi 6 mesh", "Instalação grátis", "Sem franquia"] },
];

export default function Plans() {
  return (
    <section id="planos" className="relative py-36">
      {/* o fio desce pela margem esquerda durante a seção */}
      <span data-node="left" className="absolute top-12" />
      <span data-node="left" className="absolute bottom-12" />
      <div className="wrap">
        <Rise>
          <p className="tag">01 — Planos</p>
        </Rise>
        <Lines className="h-lg mt-5" lines={["Escolha a sua", "velocidade."]} />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <Rise key={p.speed + p.unit} delay={i * 0.12}>
              <article
                className={`group flex h-full flex-col rounded-3xl border p-8 transition-[border-color,background-color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${
                  p.featured ? "border-lime/60 bg-lime/[0.06]" : "border-white/10 bg-white/[0.03] hover:border-white/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/45">Fibra</span>
                  {p.featured && <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Mais escolhido</span>}
                </div>
                <p className="mt-8 font-display text-7xl font-light leading-none">
                  <CountUp to={p.speed} />
                  <span className="ml-2 text-xl text-lime">{p.unit}</span>
                </p>
                <p className="mt-8 font-display text-2xl">
                  R$ {p.price}
                  <span className="text-sm text-white/45"> /mês</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-white/70">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5">
                      <Check size={14} className="text-lime" /> {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Olá! Quero o plano de ${p.speed} ${p.unit} da INET.`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-10 ${p.featured ? "btn-lime" : "btn-ghost"}`}
                >
                  Assinar
                </a>
              </article>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
