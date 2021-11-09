import React, { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import styled from './Login.module.css';
import Layout from '../Layout';
import { AuthContext } from '../../context/Auth';

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<null|boolean>(false)
  const menu = useContext(AuthContext);

  const { signIn } = useAuth();

  async function handleSubmit(e: any) {
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

    
  }

  if (form) {
    return (
      <React.Fragment>
        <Layout context={menu}>

        <p>Check je email voor inloglink. Je kan dit venster veilig sluiten.</p>

        </Layout>
    </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
         <Layout context={menu}>
         <section className='flex flex-row justify-center '>
          <main className='flex flex-col w-96'>
            <form id="loginForm" onSubmit={handleSubmit} className={styled.form}>
              <label htmlFor='input-email'>Email</label>
              <input id='input-email' type='email' ref={emailRef} />
  
              <button type='submit'>Login</button>
            </form>
  
  
  
            <p className="mt-6">
              Heb je nog geen account? <Link to='/signup'>Sign up</Link>
            </p>
          </main>
        </section>
           </Layout>
       
      </React.Fragment>
    );
  }
}
