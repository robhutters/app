import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/Auth';
import getProfile from '../../helpers/getProfile';

interface IProfile {
  username: string | null;
  website: string | null;
  avatar_url: string | null;
}

export function Dashboard() {
  // Get current user and signOut function from context
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<IProfile>({
    username: null,
    website: null,
    avatar_url: null,
  } as IProfile);

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

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push('/login');
  }

  return (
    <div>
      {/* Change it to display the user ID too 👇*/}
      <p>Welcome, {profile?.username}!</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
