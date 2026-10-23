import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import FiberBundle from "./FiberBundle";
import FiberTrail from "./FiberTrail";
import Lines, { Rise } from "./Lines";
import { SPRING } from "../motion";
import { waLink } from "../lib";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, SPRING);
  // ao rolar, o fundo sobe devagar e esmaece (paralaxe), sem cortes bruscos
  const bgY = useTransform(p, [0, 1], ["0%", "-18%"]);
  const bgOpacity = useTransform(p, [0, 0.9], [1, 0]);
  const textY = useTransform(p, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-0">
        <FiberBundle className="absolute inset-0 h-full w-full" />
      </motion.div>
      <FiberTrail className="absolute inset-0 h-full w-full" />

      <motion.div style={{ y: textY }} className="wrap pointer-events-none relative z-10 pt-20">
        <Rise>
          <p className="tag">Internet 100% fibra óptica</p>
        </Rise>
        <Lines
          as="h1"
          delay={0.15}
          className="h-xl mt-6"
          lines={["Internet de verdade", <span className="italic text-lime">é fibra.</span>]}
        />
        <Rise delay={0.5}>
          <p className="mt-7 max-w-md text-lg text-white/65">Rápida, estável e com o suporte de quem está perto de você.</p>
        </Rise>
        <Rise delay={0.65} className="pointer-events-auto mt-10 flex flex-wrap gap-3">
          <a href="#planos" className="btn-lime">
            Ver planos
          </a>
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-ghost">
            Falar no WhatsApp
          </a>
        </Rise>
      </motion.div>

      <motion.a
        href="#planos"
        aria-label="Rolar para os planos"
        style={{ opacity: bgOpacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/50"
      >
        <ArrowDown size={20} />
      </motion.a>
      {/* início do fio que percorre a página */}
      <span data-node="center" className="absolute bottom-0 left-1/2" />
    </section>
  );
}
