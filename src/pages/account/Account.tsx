import { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabaseClient';
import { AuthContext, useAuth } from '../../context/Auth';
import Layout from '../Layout';
import {useHistory} from 'react-router-dom';

export function Account() {
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(true);
  /* useful to create objects with with which to create POST requests  */
  const [userName, setUserName ] = useState<string>("");
  const [firstName, setFirstName ] = useState<string>("");
  const [lastName, setLastName ] = useState<string>("");
  const context = useContext(AuthContext);
  /* get user from Auth context */
  const {user} = useAuth();

  useEffect(() => {
    (async () => { 
 
        if (user) {      
          const {data, error} = await supabase.from('profiles').select().eq("user_id", user.id)
          if (data !== null) {
            const {username, first_name, last_name} = data[0]
            setUserName(username)
            setLastName(last_name)
            setFirstName(first_name)
          }

          setLoading(false)   
        } else {
          history.push('/')
        }
        
    })();
  }, []);


  async function deleteAccount() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')
      const result = confirm('Are you sure?')

      if (result) {     
        await supabase.from('profiles').delete().eq("user_id", user.id);      
        alert('User deleted!')
      }
    
    } catch (error) {
      alert('Error deleting the account!')
     
    } finally {
      setLoading(false)
      // Note that you also will force a logout after completing it
      await supabase.auth.signOut()
      history.push('/')
    }
  }

  /* This is a PUBLIC profile */

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
      await supabase.from('profiles').update({
          username: userName,
          first_name: firstName,
          last_name: lastName     
      }).eq('user_id', user.id)
      
     
        alert('Profile updated successfully!')
      
    } catch (err) {
      alert('Something went wrong!')
    } 
    
  }

  return (
    <Layout context={context}>
      <div className='flex flex-col px-6 max-w-xl mx-auto'>
       <form onSubmit={handleSubmit} className='form-widget flex flex-col max-w-xl mx-auto' >
        <div className='py-3'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' value={user.email} disabled />
        </div>
        <div className='py-3'>
          <label htmlFor='userName'>Gebruikersnaam: {user?.user_metadata.username}</label>
          
          <input id='userName' type='text' value={userName} onChange={(e) => setUserName(e.target.value)}  />
        </div>
      <div className='py-3'>
        <label htmlFor='first_name'>Naam: {user?.user_metadata.first_name}</label>
        
        <input id='first_name' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
      </div>

      <div className='py-3'>
        <label htmlFor='first_name'>Achternaam: {user?.user_metadata.last_name}</label>
        
        <input id='first_name' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}  />
      </div>
      

      <div className='py-3'>
        <button className='button block primary hover:bg-gray-200' disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      </form>
      <div>
        <button className='button block' onClick={async () => {
          await supabase.auth.signOut() 
          history.push('/')}}>
          Sign Out
        </button>
      </div>
     
      <div className='py-6'>
        <div className="flex flex-row justify-center p-3"><p>
            Delete je account. Je kan dit niet ongedaan maken.
          </p></div>
      <button className='button block bg-red-800 text-white' onClick={() => deleteAccount()}>
          delete
        </button>
      </div>
    </div>
    </Layout>
  );
}
