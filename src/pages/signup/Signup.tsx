import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

export function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { signUp } = useAuth();

  const history = useHistory();

  async function handleSubmit(e: any) {
    e.preventDefault();

    // Get email and password input values
    if (emailRef.current !== null && passwordRef.current !== null) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      // Calls `signUp` function from the context
      const user = await signUp({ email, password });
      console.log(user);

      if (user.error !== null) {
        alert('error signing in');
      } else {
        // Redirect user to Dashboard
        history.push('/dashboard');
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='input-email'>Email</label>
        <input id='input-email' type='email' ref={emailRef} />

        <label htmlFor='input-password'>Password</label>
        <input id='input-password' type='password' ref={passwordRef} />

        <br />

        <button type='submit'>Sign up</button>
      </form>

      <br />

      <p>
        Already have an account? <Link to='/login'>Log In</Link>
      </p>
    </>
  );
}
