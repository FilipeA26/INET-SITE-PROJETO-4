export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      {/* fim do fio */}
      <span data-node="center" className="absolute left-1/2 top-0" />
      <div className="wrap flex flex-col items-center justify-between gap-4 py-10 text-xs text-white/45 sm:flex-row">
        <img src="/inet-logo-branca.png" alt="INET Internet Fibra Óptica" className="h-7 w-auto opacity-80" />
        <span>inetminas.com.br · (33) 3536-3939</span>
        <span>© {new Date().getFullYear()} INET – Internet Fibra Óptica</span>
      </div>
    </footer>
  );
}
