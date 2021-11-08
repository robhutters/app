import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import styled from './Login.module.css';

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null);

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
      }
    }
  }

  return (
    <React.Fragment>
      <section className='flex flex-row justify-center '>
        <main className='flex flex-col w-96'>
          <form onSubmit={handleSubmit} className={styled.form}>
            <label htmlFor='input-email'>Email</label>
            <input id='input-email' type='email' ref={emailRef} />

            <button type='submit'>Login</button>
          </form>

 

          <p className="mt-6">
            Heb je nog geen account? <Link to='/signup'>Sign up</Link>
          </p>
        </main>
      </section>
    </React.Fragment>
  );
}
