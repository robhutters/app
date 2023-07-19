import React, { useRef, useState, useContext } from 'react';
import { useAuth } from '../../context/Auth';
import styled from './Login.module.css';
import Layout from '../Layout';
import { AuthContext } from '../../context/Auth';
import {Link, useHistory} from 'react-router-dom';

export function Login() {
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const emailRefWithPassword = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  // const {user} = useAuth()

  /* why useRef?
    'mutable reference'
    useRef holds mutable data
    Changing the reference doesn't trigger component re-rendering.
    This way you can control _when_ the component re-renders.
    React will set its 'current' property to the DOM node it's referencing.
  */
  const [form, setForm] = useState<null|boolean>(false)

  const { signIn, signInMagic, menu } = useAuth();

  async function handlePasswordSubmit(e: any) {
    
    setLoading(true)
    e.preventDefault();
      // Get email and password input values
    if (emailRefWithPassword.current !== null && passwordRef.current !== null) {
     
      const email = emailRefWithPassword.current.value;
      const password = passwordRef.current.value;

      // const profile = await supabase.from('profiles').select().eq("user_id", user.id)
      const { data, error } = await signIn(email, password);

     
        if (error !== null) {
          alert(error);
        } 

        if (data) {
          setLoading(false)
          history.push('/')
        }
    }

  }

  async function handleSubmit(e: any) {
    e.preventDefault()

    try {
    
       
      if (emailRef.current !== null) {
        const email = emailRef.current.value;
         // Calls `signUp` function from the context
         const { error } = await signInMagic({ email });

         if (error !== null) {
           alert(error);
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
    
        <Layout menu={menu}>

        <p>Check your email for login link. You may safely close this window / tab.</p>

        </Layout>
   
    )
  } else {
    return (
     
         <Layout menu={menu}>


        

         <section className='flex flex-row justify-center '>
        
          <main className='flex flex-col w-96 pt-10'>

            <h1>Welkom!</h1>
           
       

            <strong className='my-4'>Magic Link</strong>
            <p>Inloggen met enkel je e-mail. Je hoeft geen account te hebben aangemaakt.</p>
            <p className="px-24  text-center">&nbsp;</p>

            <form id="loginForm" onSubmit={handleSubmit} className={styled.form}>
              <label htmlFor='input-email'>Email</label>
              <input id='input-email' type='email' ref={emailRef} />
              
              <button type='submit' disabled={loading}>
              {loading ? 'Logging you in ...' : 'Login'}</button>
            </form>
      
            <strong className='py-4'>Inloggen met wachtwoord</strong>
            <p className='my-4'>Hiervoor moet je je eerst <Link to="/signup"><strong>aangemeld</strong></Link> hebben.</p>
            <form id="loginForm" onSubmit={handlePasswordSubmit} className={styled.form}>
              <label htmlFor='input-email'>Email</label>
              <input id='input-email' type='email' ref={emailRefWithPassword} />
              <label htmlFor='input-password'>Wachtwoord</label>
              <input id='input-password' type='password' ref={passwordRef} />
              
              <button type='submit' disabled={loading}>
              {loading ? 'Logging you in ...' : 'Login'}</button>
            </form>
           
            
          
          </main>
        </section>
           </Layout>
       

    );
  }
}
