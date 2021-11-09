import { useContext, useState,useEffect } from 'react';
import Layout from '../Layout';
import './home.css';
import { AuthContext,useAuth } from '../../context/Auth';
import getProfile from '../../helpers/getProfile';

interface IProfile {
  username: string | null;
  website: string | null;
  avatar_url: string | null;
}
import {useHistory} from 'react-router-dom'

function Home() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<IProfile>({
    username: null,
    website: null,
    avatar_url: null,
  } as IProfile);

  const menu = useContext(AuthContext);


  const history = useHistory();

  useEffect(() => {
    (async function () {
      const profile = await getProfile();
      console.log(profile);
      if (profile !== undefined) {
        setProfile(profile);
      }
    })();
  }, []); 
  
  return (
    <Layout context={menu} style={{ padding: '50px 25px 100px 25px' }}>
      <section className="px-6">
        <p>Layout ...</p>
        <p>Gebruiker ingelogd? {user.id} Naam: {profile.username}</p>
      </section>
    </Layout>
  );
}

export default Home;
