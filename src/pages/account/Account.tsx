import { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabaseClient';
import { AuthContext } from '../../context/Auth';
import Layout from '../Layout';

import {useHistory} from 'react-router-dom';

interface accountData {
  username: string;
  website: string;
  avatar_url: string;
}

export default function Account({ user }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [accountData, setData] = useState<accountData>({
    username: 'person',
    website: '',
    avatar_url: '',
  });
  const history = useHistory()

  const menu = useContext(AuthContext);

  const setUsername = (u: string) => {
    setData((data) => ({ ...data, username: u }));
  };

  const setWebsite = (w: string) => {
    setData((data) => ({ ...data, website: w }));
  };

  useEffect(() => {
    console.log(user.id);
   
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



  async function deleteProfile({username}:accountData) {

    try {
      setLoading(true)
      const confirmation = confirm('Are you absolutely sure you want to delete your account? There is no going back!')



      if (confirmation) {
        const { error } = await supabase
        .from('profiles')
        .delete()
        .match({ id: user.id })

        if (error) {
          throw error;
        } else {
          alert('Account successfully deleted. Redirecting you to home page in 3 seconds')
          setTimeout(() => {
            history.push('/')
          }, 3000)
        }
      }
     
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false)
    }

    
  }

  return (
    <Layout context={menu}>
       <div className='form-widget flex flex-col px-6 max-w-xl mx-auto'>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' value={user.email} disabled />
      </div>
      <div>
        <label htmlFor='username'>Name</label>
        <input id='username' type='text' value={accountData.username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor='website'>Website</label>
        <input id='website' type='website' value={accountData.website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div>
        <button className='button block primary' onClick={() => updateProfile(accountData)} disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className='button block' onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
      <div>
        <div className="flex flex-row justify-center p-3"><p>
            This will permanently delete your account. 
          </p></div>
      <button className='button block bg-red-600' onClick={() => deleteProfile(accountData)}>
          delete
        </button>
      </div>
    </div>
    </Layout>
  );
}
