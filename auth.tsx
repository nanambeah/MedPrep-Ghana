import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabaseClient";

// --- Types ---
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  subscriptionStatus: "active" | "expired" | "none";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role?: "user" | "admin") => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  updateSubscription: (status: User["subscriptionStatus"]) => void;
}

// --- Mock Data ---
const MOCK_USER: User = {
  id: "1",
  name: "Dr. Kwame Mensah",
  email: "kwame@example.com",
  role: "user",
  subscriptionStatus: "none",
};

const MOCK_ADMIN: User = {
  id: "2",
  name: "Admin User",
  email: "admin@medprep.gh",
  role: "admin",
  subscriptionStatus: "active",
};

// --- Context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Check Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // In a real app, fetch user details from 'profiles' table
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || "User",
          role: "user", // Default
          subscriptionStatus: "none" // Default
        });
      } else {
        // Fallback to local storage for persistent mock session if needed
        const storedUser = localStorage.getItem("medprep_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || "User",
          role: "user",
          subscriptionStatus: "none"
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, role: "user" | "admin" = "user") => {
    // For now, keep the mock login logic alongside real auth if needed
    // or fully switch to Supabase Auth
    
    // Simulate login for mock
    if (!import.meta.env.VITE_SUPABASE_URL) {
        const newUser = role === "admin" ? MOCK_ADMIN : { ...MOCK_USER, email };
        setUser(newUser);
        localStorage.setItem("medprep_user", JSON.stringify(newUser));
        if (role === "admin") {
          setLocation("/admin");
        } else {
          setLocation("/dashboard");
        }
        return;
    }

    // Real Supabase Login (Magic Link or Password)
    // For this mockup, we'll just simulate it as requested but user likely wants Supabase integration
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
    // Note: In a real app, this sends an email. For mockup, we might want to stick to mock behavior unless fully configured.
  };

  const register = async (name: string, email: string) => {
    if (!import.meta.env.VITE_SUPABASE_URL) {
        const newUser: User = { ...MOCK_USER, name, email };
        setUser(newUser);
        localStorage.setItem("medprep_user", JSON.stringify(newUser));
        setLocation("/subscription");
        return;
    }
    
    // Real Supabase Sign Up
    const { error } = await supabase.auth.signUp({
      email,
      password: 'example-password', // In a real form, get password
      options: {
        data: { name },
      },
    });
    if (error) throw error;
  };

  const logout = async () => {
    if (import.meta.env.VITE_SUPABASE_URL) {
        await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem("medprep_user");
    setLocation("/");
  };

  const updateSubscription = (status: User["subscriptionStatus"]) => {
    if (user) {
      const updatedUser = { ...user, subscriptionStatus: status };
      setUser(updatedUser);
      localStorage.setItem("medprep_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, updateSubscription }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
