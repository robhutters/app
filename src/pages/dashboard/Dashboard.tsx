import { useEffect, useState,useContext } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/Auth';
import { AuthContext } from '../../context/Auth';
import Layout from '../Layout';
import IProfile from '../../interfaces/IProfile';
import getUserData from '../../helpers/getUserData';

/* 
  React.memo is a higher-order component that renders the component only if props are changed.
*/

export function Dashboard() {
  // Get current user and signOut function from context
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<IProfile>({
    username: null,
    last_name: null,
    first_name: null,
  } as IProfile);

  const menu = useContext(AuthContext);


  const history = useHistory();

  useEffect(() => {
    (async function () {
      
      const profile = await getUserData(user.id);
      console.log(profile)
      if (profile !== undefined) {
        setProfile(profile[0]);
      }
    })();
  }, []);

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push('/login');
  }

  return (
    <div>
      <Layout context={menu}>
          {/* Change it to display the user ID too 👇*/}
      <section  className='flex flex-col px-6 max-w-xl mx-auto' >

        <main className=' border-2'>
          <p>Welcome, {profile?.first_name}!</p>
          <p>Your user id is {user.id}</p>
      

          <button onClick={handleSignOut}>Sign out</button>
        </main>
      </section>
      </Layout>
    </div>
  );
}
