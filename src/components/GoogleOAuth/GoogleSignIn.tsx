import React from 'react';
import { supabase } from '../../supabaseClient';

export function GoogleSignIn() {
  const onClick = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: 'google',
      },
      {
        redirectTo: 'http://localhost:3000/dashboard',
      }
    );
  };

  return (
    <button className={'..'} onClick={onClick}>
      Sign in with Google
    </button>
  );
}

export default GoogleSignIn;
