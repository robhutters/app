import React, { useRef, useState, useContext } from 'react';
import { useAuth } from '../../context/Auth';
import styled from './Login.module.css';
import Layout from '../Layout';
import { AuthContext } from '../../context/Auth';
import {useHistory} from 'react-router-dom';

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
  const menu = useContext(AuthContext);

  const { signIn, signInMagic } = useAuth();

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
          history.push('/home')
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
           
           
           

            <strong className='py-4'>Password</strong>
            <form id="loginForm" onSubmit={handlePasswordSubmit} className={styled.form}>
              <label htmlFor='input-email'>Email</label>
              <input id='input-email' type='email' ref={emailRefWithPassword} />
              <label htmlFor='input-password'>Password</label>
              <input id='input-password' type='password' ref={passwordRef} />
              
              <button type='submit' disabled={loading}>
              {loading ? 'Logging you in ...' : 'Login'}</button>
            </form>
       

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
