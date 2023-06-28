import React, { useRef, useState, useContext } from 'react';
import { useAuth } from '../../context/Auth';
import styled from './Login.module.css';
import Layout from '../Layout';
import { AuthContext } from '../../context/Auth';
import SpotifySignIn from '../../components/SpotifyOAuth/SpotifyOAuth';

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /* why useRef?
    'mutable reference'
    useRef holds mutable data
    Changing the reference doesn't trigger component re-rendering.
    This way you can control _when_ the component re-renders.
    React will set its 'current' property to the DOM node it's referencing.
  */
  const [form, setForm] = useState<null|boolean>(false)
  const menu = useContext(AuthContext);

  const { signIn } = useAuth();

  async function handleSubmit(e: any) {
   

    try {
      setLoading(true)
      e.preventDefault();
        // Get email and password input values
      if (emailRef.current !== null) {
       
        const email = emailRef.current.value;

        // Calls `signUp` function from the context
        const { error } = await signIn({ email });

        if (error !== null) {
          alert('error signing in');
        } else {
          
          setForm(!form)
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

  if (form) {
    return (
      <React.Fragment>
        <Layout context={menu}>

        <p>Check your email for login link. You may safely close this window / tab.</p>

        </Layout>
    </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
         <Layout context={menu}>


        

         <section className='flex flex-row justify-center '>
        
          <main className='flex flex-col w-96 pt-10'>

            <h1>Welcome!</h1>
           
          <p className="py-4">You don't need to create an account to use our app. You can sign-in with any of the listed providers below <strong>or</strong> through a magic link!</p>
            

            <strong className="py-4">Providers</strong>
            <SpotifySignIn />
            <p className="px-24 py-4 text-center">&#x2015;</p>
       

            <strong>Magic Link</strong>
            <p>Log in securely with <em>any</em> e-mail, instantly.  </p>
            <p className="px-24  text-center">&nbsp;</p>

            <form id="loginForm" onSubmit={handleSubmit} className={styled.form}>
              <label htmlFor='input-email'>Email</label>
              <input id='input-email' type='email' ref={emailRef} />
              
              <button type='submit' disabled={loading}>
              {loading ? 'Logging you in ...' : 'Login'}</button>
            </form>
  
           
            
          
          </main>
        </section>
           </Layout>
       
      </React.Fragment>
    );
  }
}
