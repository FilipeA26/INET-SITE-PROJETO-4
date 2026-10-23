import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { DUR, EASE } from "../motion";
import { waLink } from "../lib";

/** Cabeçalho mínimo: some ao descer e volta ao subir, sempre com a mesma curva. */
export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400);
    setSolid(y > 80);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: DUR * 0.7, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${solid ? "bg-navy-ink/70 backdrop-blur-xl" : ""}`}
    >
      <div className="wrap flex h-20 items-center justify-between">
        <a href="#inicio" aria-label="INET – início">
          <img src="/inet-logo-branca.png" alt="INET Internet Fibra Óptica" className="h-8 w-auto" />
        </a>
        <nav className="flex items-center gap-8">
          <a href="#planos" className="hidden text-sm text-white/70 transition-colors duration-500 hover:text-white sm:inline">
            Planos
          </a>
          <a href="#contato" className="hidden text-sm text-white/70 transition-colors duration-500 hover:text-white sm:inline">
            Cobertura
          </a>
          <a href={waLink("Olá! Quero assinar a internet fibra da INET.")} target="_blank" rel="noreferrer" className="btn-lime px-5 py-2.5">
            Assine
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
