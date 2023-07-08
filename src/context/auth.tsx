import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import AuthContextType from '../interfaces/AuthContextType';
import getUserData from '../helpers/getUserData';
import IProfile from '../interfaces/IProfile';

export const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<object | null>(null);
  const [profile, setProfile] = useState<IProfile>({
    username: null,
    first_name: null,
    last_name: null,
  } as IProfile);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [restricted, setRestriction] = useState<boolean>(false);

  useEffect(() => {
    // Check active sessions and sets the user
   

      const fetchUser = async () => {
        
        const { data, error } =  await supabase.auth.getSession();
        const { session } = data 
     
       
        if (session !== null ) {
          setUser(session?.user ?? null);
          setLoading(false);
          setRestriction(true);
          const profile = await getUserData(session.user.id);
          if (profile !== undefined) {
            console.log('Auth context: Profile found!')
            console.log(profile)
            setProfile(profile[0]);
        }

        }
    
      
         // Listen for changes on auth state (logged in, signed out, etc.)
          const { data: authListener } = supabase.auth.onAuthStateChange((event, _session) => {
            setUser(_session?.user ?? null);
            
            setRestriction(false);
            setLoading(false);
          });
  
    
  
      return () => {
        authListener?.subscription.unsubscribe()
      };
      }
     

     try {
      fetchUser()
     } catch (err) {
       alert('Error fetching user!')
     }



   
  }, []);

  // Will be passed down to Signup, Login and Dashboard components
  const auth = {
    signUp: (data: any) => supabase.auth.signUp(data),
    signInMagic: (data: any) => supabase.auth.signInWithOtp(data),
    signIn: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password}),
    signOut: () => supabase.auth.signOut(),
    user: user,
    profile: profile,
    menu: {
      open: open,
      setOpen: setOpen
    },
    restricted,
    setRestriction,
    loading
  };

  return <AuthContext.Provider value={auth}>{!loading && children}</AuthContext.Provider>;
}

// whenever you need access to the values associated with AuthContext provider, use this function below to access them

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}


