import { useEffect, useState,useContext,useRef } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/Auth';
import { AuthContext } from '../../context/Auth';
import Layout from '../Layout';
import IProfile from '../../interfaces/IProfile';
import getUserData from '../../helpers/getUserData';
import { supabase } from '../../supabaseClient';

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

  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    (async function () {
      setLoading(true)
      const profile = await getUserData(user.id);
      
      if (profile !== undefined) {
        setProfile(profile[0]);
        setLoading(false)
      }
    })();
  }, []);

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push('/login');
  }

  async function handleSubmit(e:any) {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form)
  
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject)

    const { error } = await supabase
    .from('recipes')
    .insert({
      user_id: user.id,
      recipename: formObject.recipeName,
      byline: formObject.byline,
      labels: [formObject.labels],
      description: formObject.description
    })

    if (error) {
      alert('Error occurred!')
    } else {
      alert('Entry uploaded!')
    }
    
  }

  return (
    <div>
      <Layout context={menu}>
          {/* Change it to display the user ID too 👇*/}
      <section  className='flex flex-col  ' >

        <main className='flex flex-row justify-around'>
          <section>
          <p>Welcome, {profile?.first_name}!</p>
          <p>Your user id is {user.id}</p>
          <button onClick={handleSignOut}>Sign out</button>
          </section>
         
          <section className="flex flex-col">
            <form method="post" id="submitRecipeForm" onSubmit={handleSubmit}>
                <label htmlFor='recipeName'>Geef je recept een naam:</label>
                <input name='recipeName'  className="my-3" type='text'  />
                <label htmlFor='byline'>Voor onder de titel:</label>
                <input name='byline' className="my-3" type='text'  />
                <label htmlFor='labels'>Labels (b.v. vegan):</label>
                <input name='labels' className="my-3" type='text'  />
                <label htmlFor='description' >Beschrijving:</label>
                <br />
                <textarea name='description' className="my-3 w-full border-2 border-black" rows={5}  wrap="soft" />
                
                <button type='submit' disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}</button>
              </form>
              
          </section>

          
        </main>
      </section>
      </Layout>
    </div>
  );
}
