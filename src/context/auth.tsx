import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [restricted, setRestriction] = useState<boolean>(false);

  console.log(user);
  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);
    setRestriction(true);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setRestriction(false);
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
    open,
    setOpen: setOpen,
    restricted,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

// whenever you need access to the values associated with AuthContext provider, use this function below to access them

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

interface IUser {
  app_metadata: { provider: string };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_change_confirm_status: number;
  email_confirmed_at: string;
  id: string;
  invited_at: string;
  last_sign_in_at: string;
  phone: string;
  recovery_sent_at: string;
  role: string;
  updated_at: string;
  user_metadata: object;
}

interface AuthContextType {
  user: IUser;
  signOut: () => void;
  signIn: (data: any) => { error: any };
  signUp: (data: any) => { data: object; user: object; error: any; session: any };
  open: any;
  setOpen: Function;
  restricted: any;
}
