import { useState, type FormEvent } from "react";
import { ArrowRight, Instagram, MessageCircle, Phone } from "lucide-react";
import Lines, { Rise } from "./Lines";
import { PHONE, waLink } from "../lib";

export default function Contact() {
  const [query, setQuery] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.open(waLink(`Olá! Quero saber se a INET atende: ${query}`), "_blank", "noreferrer");
  };

  return (
    <section id="contato" className="relative py-36">
      <span data-node="left" className="absolute top-12" />
      <span data-node="left" className="absolute bottom-12" />
      <div className="wrap text-center">
        <Rise>
          <p className="tag">03 — Cobertura</p>
        </Rise>
        <Lines className="h-lg mx-auto mt-5" lines={["A fibra da INET", <span className="italic text-lime">chega na sua rua?</span>]} />

        <Rise delay={0.2}>
          <form onSubmit={submit} className="mx-auto mt-12 flex max-w-lg items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] p-2 backdrop-blur-md transition-colors duration-700 focus-within:border-lime/70">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Seu CEP ou bairro"
              aria-label="CEP ou bairro"
              className="min-w-0 flex-1 bg-transparent px-5 text-white placeholder:text-white/40 focus:outline-none"
            />
            <button type="submit" className="btn-lime px-5 py-3" aria-label="Consultar">
              Consultar <ArrowRight size={16} />
            </button>
          </form>
        </Rise>

        <Rise delay={0.35} className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/65">
          <a href="tel:+553335363939" className="inline-flex items-center gap-2 transition-colors duration-500 hover:text-lime"><Phone size={15} /> {PHONE}</a>
          <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors duration-500 hover:text-lime"><MessageCircle size={15} /> WhatsApp</a>
          <a href="https://instagram.com/inetminas" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors duration-500 hover:text-lime"><Instagram size={15} /> @inetminas</a>
        </Rise>
      </div>
    </section>
  );
}
