import { supabase } from '../../supabaseClient';

export function GoogleSignIn() {
  /* 
    400 bad request? There is very little to go on about debugging this.

    Don't forget that you created a google cloud project for this.
  */

  const onClick = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: 'google',
      }
    );

    if (error) {
      console.log(error)
    }
  };

  return (
    <button className="bg-white text-black my-4" onClick={onClick}>
      Sign in with Google
    </button>
  );
}

export default GoogleSignIn;
