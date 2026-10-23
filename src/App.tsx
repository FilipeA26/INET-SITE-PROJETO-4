import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Plans from "./components/Plans";
import Why from "./components/Why";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Thread from "./components/Thread";
import { SPRING } from "./motion";

/** Rolagem suave com inércia; links "#" também deslizam com a mesma suavidade. */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9 });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { duration: 1.8, easing: (x) => 1 - Math.pow(1 - x, 4) });
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
}

export default function App() {
  useSmoothScroll();
  const mainRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, SPRING);
  // o fundo muda de forma contínua ao longo da página: do quase preto ao azul da marca
  const bg = useTransform(p, [0, 0.3, 0.65, 1], ["#010818", "#020F2E", "#03256C", "#003F99"]);

  return (
    <motion.div style={{ backgroundColor: bg }}>
      <Header />
      <main ref={mainRef} className="relative">
        <Thread container={mainRef} />
        <div className="relative z-10">
          <Hero />
          <Plans />
          <Why />
          <Contact />
          <Footer />
        </div>
      </main>
    </motion.div>
  );
}
