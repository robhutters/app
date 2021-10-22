import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: (data: any) => supabase.auth.signUp(data),
    signIn: (data: any) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

// whenever you need access to the values associated with AuthContext provider, use this function below to access them

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

interface IUser {
  id: string;
}

interface AuthContextType {
  user: IUser;
  signOut: () => void;
  signIn: (data: any) => { data: object; user: object; error: any; session: any };
  signUp: (data: any) => { data: object; user: object; error: any; session: any };
}
