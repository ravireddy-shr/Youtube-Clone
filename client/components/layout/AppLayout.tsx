import { Link, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Home, Compass, PlaySquare, Library, Upload, User } from "lucide-react";
import { ReactNode, useState } from "react";

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative h-8 w-8 rounded-md bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-[0_0_20px_rgba(239,68,68,0.6)]" />
      <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-red-400 transition-colors">GlassTube</span>
    </Link>
  );
}

function Topbar() {
  const [query, setQuery] = useState("");
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-[1400px] px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Brand />
        </div>
        <div className="hidden md:flex flex-1 max-w-xl items-center gap-2">
          <div className="relative w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-2.5 pr-12 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-500/60"
            />
            <button className="absolute right-1.5 top-1.5 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            title="Admin-only uploads"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/80 hover:text-white cursor-not-allowed"
          >
            <Upload className="h-4 w-4 text-red-400" />
            Upload
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white px-4 py-2 text-sm shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_28px_rgba(239,68,68,0.65)]">
            <User className="h-4 w-4" />
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}

function Sidebar() {
  const NavItem = ({ to, icon: Icon, label, disabled }: { to: string; icon: any; label: string; disabled?: boolean }) => (
    <Link
      to={to}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/80 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5 transition-colors",
      )}
    >
      <Icon className="h-4 w-4 text-red-400 group-hover:scale-105 transition-transform" />
      <span>{label}</span>
      {disabled ? <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60">soon</span> : null}
    </Link>
  );

  return (
    <aside className="hidden md:block sticky top-16 h-[calc(100dvh-4rem)] w-60 shrink-0 p-3">
      <nav className="flex flex-col gap-1">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/explore" icon={Compass} label="Explore" disabled />
        <NavItem to="/subscriptions" icon={PlaySquare} label="Subscriptions" disabled />
        <NavItem to="/library" icon={Library} label="Library" disabled />
      </nav>
    </aside>
  );
}

export default function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_800px_at_-10%_-10%,rgba(239,68,68,0.15),transparent_60%),radial-gradient(800px_600px_at_110%_10%,rgba(239,68,68,0.12),transparent_60%)]" />
      <Topbar />
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex gap-6">
          <Sidebar />
          <main className="flex-1 py-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.35)]">
              {children ?? <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
