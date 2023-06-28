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
    username: '',
    website: '',
    avatar_url: '',
  });
  const [providerData, setProviderData] = useState<any>(null)
  const history = useHistory()

  const menu = useContext(AuthContext);

  const setUsername = (u: string) => {
    setData((data) => ({ ...data, username: u }));
  };

  useEffect(() => {
    console.log(user.id);
   
    getProfile();
   
  }, [user]);

  async function getProfile() {
    try {
      setLoading(true);


      let User = await supabase.auth.getUser()

      if (User !== null) {
        console.log('Checking logged in user ...')
        console.log(User)
      
        // if (User.app_metadata.provider === 'email') {
        //     let { data, error, status } = await supabase.from('profiles').select(`username, website, avatar_url`).eq('id', user.id).single();

        //   if (error && status !== 406) {
        //     throw error;
        //   }

        //   if (status === 406) {
        //     alert('Please complete your profile.')
        //   }
    
        //   data && setData(data);
        //   if (data) {
        //     setData(data);
        //   }
        // } else {
        //   setProviderData(User)
        // }

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
      const user = supabase.auth.getUser();

      if (user !== null) {
        const updates = {
          // id: user.id,
          username,
          website,
          avatar_url,
          updated_at: new Date(),
        };

        // let { error, status } = await supabase.from('profiles').upsert(updates, {
        //   returning: 'minimal', // Don't return the value after inserting
        // });

        // if(status === 400) {
        //   alert('Operation not allowed.')
        // }

        // if (error) {
        //   throw error;
        // }

       
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
        // const { data, error} = await supabase.rpc('delete_user')
        const { data,error } = await supabase.from('profiles').delete().match({ id: user.id})


        console.log(data)
        if (error) {
          console.log(error)

          throw error;
        } else {
          alert('Account successfully deleted. Redirecting you to home page in 3 seconds')
          supabase.auth.signOut()
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

  /* This is a PUBLIC profile */

  return (
    <Layout context={menu}>
       <div className='form-widget flex flex-col px-6 max-w-xl mx-auto'>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' value={user.email} disabled />
      </div>
      <div>
        <label htmlFor='username'>Name</label>
        <input id='username' type='text' value={providerData !== null ? providerData.identities[0].identity_data.full_name : accountData.username} onChange={(e) => setUsername(e.target.value)} />
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
