import { useContext, useState,useEffect } from 'react';
import Layout from '../Layout';
// import './home.css';
import { AuthContext,useAuth } from '../../context/Auth';
import getProfile from '../../helpers/getProfile';
import { supabase } from '../../supabaseClient';

interface IProfile {
  username: string | null;
  website: string | null;
  avatar_url: string | null;
}

function Home() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IProfile>({
    username: null,
    website: null,
    avatar_url: null,
  } as IProfile);

  
  const menu = useContext(AuthContext);

  useEffect(() => {
  
   if (user !== null) {
    (async function () {
      const profile = await getProfile();
      if (profile !== undefined) {
        setProfile(profile);
      }
    })();
   } 

    
  }, []); 
  
 if (user !== null && profile !== null) {
  return (
    <Layout context={menu} >
      <section className="px-6">
        <p>Layout ...</p>
        <p>User logged in? {user.id} { profile.username !== null && profile.username.length !== 0 ? `Name: ${profile.username}` : 'Profile details missing.' }</p>
      </section>
    </Layout>
  );
 } else {
  return (
    <Layout context={menu} >
      <section className="px-6">
        <p>No user ...</p>
      </section>
    </Layout>
  );
 }
}

export default Home;
