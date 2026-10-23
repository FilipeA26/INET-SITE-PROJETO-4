import { useEffect, useRef } from "react";

/**
 * Feixe de fibras descendo do alto com pontas luminosas (ref. Fiber Optic Eye),
 * com movimentos lentos: balanço suave, entrada gradual e paralaxe leve no mouse.
 */
const N = 90, K = 20;

export default function FiberBundle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const start = performance.now();
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const strands = Array.from({ length: N }, () => ({
      z: 0.25 + Math.random() ** 0.8 * 0.75,
      sx: 0.45 + Math.random() * 0.35,
      tipX: 0.7 + gauss() * 0.14,
      tipY: 0.52 + gauss() * 0.22,
      bend: 0.08 + Math.random() * 0.14,
      len: 0.75 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
    })).sort((a, b) => a.z - b.z);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = now / 1000;
      // entrada: as fibras "crescem" do alto durante 2,4 s
      const grow = Math.min(1, (now - start) / 2400);
      const g = 1 - Math.pow(1 - grow, 4);
      mouse.sx += (mouse.x - mouse.sx) * 0.025;
      mouse.sy += (mouse.y - mouse.sy) * 0.025;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const s of strands) {
        const far = s.z < 0.45;
        const sway = Math.sin(t * 0.35 + s.phase) * 9 * s.z;
        const sx = s.sx * w, sy = -h * 0.12;
        const tx = s.tipX * w + mouse.sx * 50 * s.z + sway, ty = s.tipY * h + mouse.sy * 30 * s.z;
        const cx = (sx + tx) / 2 - s.bend * w, cy = h * 0.22;
        const end = s.len * g;
        ctx.beginPath();
        let ex = sx, ey = sy;
        for (let k = 0; k < K; k++) {
          const q = (k / (K - 1)) * end, u = 1 - q;
          ex = u * u * sx + 2 * u * q * cx + q * q * tx;
          ey = u * u * sy + 2 * u * q * cy + q * q * ty;
          k === 0 ? ctx.moveTo(ex, ey) : ctx.lineTo(ex, ey);
        }
        const a = far ? 0.09 : 0.2 + s.z * 0.28;
        const grad = ctx.createLinearGradient(sx, sy, ex, ey);
        grad.addColorStop(0, "rgba(0,98,236,0)");
        grad.addColorStop(0.6, `rgba(0,98,236,${a})`);
        grad.addColorStop(1, `rgba(130,185,255,${a})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = far ? 6 + (0.45 - s.z) * 16 : 0.8 + s.z * 1.8;
        ctx.stroke();

        const tr = far ? 12 : 3 + s.z * 6;
        const pulse = 0.75 + Math.sin(t * 1.2 + s.phase) * 0.25; // pontas "respiram"
        const tg = ctx.createRadialGradient(ex, ey, 0, ex, ey, tr * 1.8);
        tg.addColorStop(0, `rgba(215,240,255,${(far ? 0.12 : 0.6) * pulse * g})`);
        tg.addColorStop(far ? 0.2 : 0.5, `rgba(150,230,120,${(far ? 0.06 : 0.3) * pulse * g})`);
        tg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = tg;
        ctx.fillRect(ex - tr * 1.8, ey - tr * 1.8, tr * 3.6, tr * 3.6);
      }
      ctx.globalCompositeOperation = "source-over";
      if (reduce && grow >= 1) cancelAnimationFrame(raf);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
