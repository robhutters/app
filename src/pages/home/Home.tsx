import { useContext, useState,useEffect } from 'react';
import Layout from '../Layout';
// import './home.css';
import { AuthContext,useAuth } from '../../context/Auth';
import getProfile from '../../helpers/getUserData';
import IProfile from '../../interfaces/IProfile';


function Home() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IProfile>({
    username: null,
    first_name: null,
    last_name: null,
  } as IProfile);

  
  const menu = useContext(AuthContext);

  useEffect(() => {
  
   if (user !== null) {
    (async function () {
      const profile = await getProfile(user.id);
      if (profile !== undefined) {
        setProfile(profile[0]);
      }
    })();
   } 

    
  }, []); 
  
 if (user !== null && profile !== null) {
  return (
    <Layout context={menu} >
      <section className="px-6">
        <p>Layout ...</p>
        <p><strong>User logged in?</strong> {user.id} </p>
        <p><strong>Name:</strong> { profile.first_name !== null && profile.first_name.length !== 0 ? `${profile.first_name}` : 'Profile details missing.' }</p>
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
