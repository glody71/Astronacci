import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  name?: string;
  email?: string;
  membership_type: "A" | "B" | "C";
}

interface JWTPayload {
  id: number;
  membership_type: "A" | "B" | "C";
  name?: string;
  email?: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [user, setUser] = useState<User | null>(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return null;
    try {
      return jwtDecode<JWTPayload>(storedToken);
    } catch {
      return null;
    }
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);

    const decoded = jwtDecode<JWTPayload>(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
