import { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabaseClient';
import { AuthContext, useAuth } from '../../context/Auth';
import Layout from '../Layout';
import {useHistory} from 'react-router-dom';

export function Account() {
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(true);
  /* useful to create objects with with which to create POST requests  */
  const [userName, setUserName ] = useState<string >('');
  const [firstName, setFirstName ] = useState<string >('');
  const [lastName, setLastName ] = useState<string >('');
  const context = useContext(AuthContext);
  /* get user from Auth context */
  const {user, profile, menu} = useAuth();

  useEffect(() => {
    (async () => { 
       
        if (!user) {              
          history.push('/')
        } else {
            if (profile) {
              setUserName(profile.username)
              setLastName(profile.last_name)
              setFirstName(profile.first_name)
            } 
            setLoading(false)
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
      const form = e.target;
      const formData = new FormData(form)
    
      const formObject = Object.fromEntries(formData.entries());

      await supabase.from('profiles').update({
          username: formObject.userName,
          first_name: formObject.firstName,
          last_name: formObject.lastName     
      }).eq('user_id', user.id)
     
     
        alert('Profile updated successfully!')
      
    } catch (err) {
      alert('Something went wrong!')
    } 
    
  }

  if (user) {
    return (
      <Layout menu={menu}>
        <div className='form-widget flex flex-col max-w-xl mx-auto'>
         <form onSubmit={handleSubmit} className='form-widget flex flex-col max-w-xl mx-auto' >
          <div className='py-3'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='text' value={user.email} disabled />
          </div>
          <div className='py-3'>
            <label htmlFor='userName'>Gebruikersnaam: {userName}</label>
            
            <input name='userName' type='text'    />
          </div>
        <div className='py-3'>
          <label htmlFor='firstName'>Naam: {firstName}</label>
          
          <input name='firstName' type='text'    />
        </div>
  
        <div className='py-3'>
          <label htmlFor='lastName'>Achternaam: {lastName}</label>
          
          <input name='lastName' type='text'    />
        </div>
        
  
        <div className='py-3 '>
          <button className='button block primary hover:bg-gray-200' disabled={loading}>
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>
        
        </form>
        <div>
          <button className='button block w-full hover:bg-gray-200' onClick={async () => {
            await supabase.auth.signOut() 
            history.push('/')}}>
            Sign Out
          </button>
        </div>
       
        <div className='py-6'>
          <div className="flex flex-row justify-center p-3"><p>
              Delete je account. Je kan dit niet ongedaan maken.
            </p></div>
        <button className='button block bg-red-800 text-white w-full' onClick={() => deleteAccount()}>
            delete
          </button>
        </div>
      </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
      <div>No user found. You shouldn't be here.</div>
    </Layout>
    )
  }
}
