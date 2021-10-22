import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='input-email'>Email</label>
        <input id='input-email' type='email' ref={emailRef} />

        <br />

        <button type='submit'>Login</button>
      </form>

      <br />

      <p>
        Heb je nog geen account? <Link to='/signup'>Sign up</Link>
      </p>
    </>
  );
}
