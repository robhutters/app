import React, { useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import Layout from '../Layout';
import { supabase } from '../../supabaseClient';

export function Signup() {
  console.log('Loaded signup component ...')
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const menu = useContext(AuthContext);

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log('Pressed submit!')
    // Get email and password input values
    if (
      emailRef.current !== null && 
      passwordRef.current !== null &&
      userNameRef.current !== null &&
      firstNameRef.current !== null && 
      lastNameRef.current !== null
      ) {
        console.log('Submitting the form')

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      // Calls `signUp` function from the context
      const result = await supabase.auth.signUp({ email, password });


      
      if (result.data.user !== null) {
        console.log(result.data.user.id)
        const username = userNameRef.current.value;
        const first_name = firstNameRef.current.value;
        const last_name = lastNameRef.current.value;
        const {data, error} = await supabase.from('profiles').update({
         username,
         first_name,
         last_name
        }).eq('user_id', result.data.user.id)
        
        if (error === null) {
          history.push('/account')
        } 
      
      } else {
        alert('Something went wrong during signup. Contact owner.')
      }

      
    }
  }

  return (
    <React.Fragment> 

<Layout context={menu}>
<section className='flex flex-row justify-center '>
    <main className='flex flex-col w-96'>
      <form onSubmit={handleSubmit}>

        <label htmlFor='input-username'>Gebruikersnaam</label>
        <input id='input-username' type='text' ref={userNameRef} />

        <label htmlFor='input-name'>Naam</label>
        <input id='input-name' type='text' ref={firstNameRef} />

        <label htmlFor='input-lastname'>Achternaam</label>
        <input id='input-lastname' type='text' ref={lastNameRef} />
          
        <label htmlFor='input-email'>Email</label>
        <input id='input-email' type='email' ref={emailRef} />

        <label htmlFor='input-password'>Password</label>
        <input id='input-password' type='password' ref={passwordRef} />

       <br />
       <button type='submit'>Sign up</button>
     </form>

     <br />

     <p>
       Already have an account? <Link to='/login'><strong>Log in</strong></Link>
     </p>
     </main>
     </section>

    </Layout>
    </React.Fragment>
    
  );
}
