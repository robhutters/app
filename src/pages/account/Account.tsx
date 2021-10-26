import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

interface accountData {
  username: string;
  website: string;
  avatar_url: string;
}

export default function Account({ user }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<accountData>({
    username: 'person',
    website: '',
    avatar_url: '',
  });

  const setUsername = (u: string) => {
    console.log(data, u);
    setData((data) => ({ ...data, username: u }));
  };

  const setWebsite = (w: string) => {
    setData((data) => ({ ...data, website: w }));
  };

  useEffect(() => {
    console.log(user);
    getProfile();
  }, [user]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase.from('profiles').select(`username, website, avatar_url`).eq('id', user.id).single();

      if (error && status !== 406) {
        throw error;
      }

      data && setData(data);
      if (data) {
        setData(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }: accountData) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      if (user !== null) {
        const updates = {
          id: user.id,
          username,
          website,
          avatar_url,
          updated_at: new Date(),
        };

        let { error } = await supabase.from('profiles').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        });

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='form-widget'>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' value={user.email} disabled />
      </div>
      <div>
        <label htmlFor='username'>Name</label>
        <input id='username' type='text' value={data.username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor='website'>Website</label>
        <input id='website' type='website' value={data.website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div>
        <button className='button block primary' onClick={() => updateProfile(data)} disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className='button block' onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
