import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Role = "admin" | "viewer";
export type User = { email: string; role: Role } | null;

type AuthContextValue = {
  user: User;
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS = [
  { email: "admin@glassy.tube", password: "admin123", role: "admin" as Role },
  {
    email: "viewer@glassy.tube",
    password: "viewer123",
    role: "viewer" as Role,
  },
];

const LS_KEY = "glassy.auth.user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_KEY);
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    const match = USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password,
    );
    if (!match) return { ok: false, error: "Invalid email or password" };
    const logged = { email: match.email, role: match.role } as User;
    setUser(logged);
    return { ok: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
