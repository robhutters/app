import { supabase } from "../../supabaseClient";

export function SpotifySignIn() {
  const onClick = async () => {
    try {
      const { error } = await supabase.auth.signIn(
        {
          provider: 'spotify',
        },
        
      );

      if (error) {
        alert(error)
      }
  
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
      }
    }
  
  };

  return (
    <button className={'bg-white text-black'} onClick={onClick}>
      Sign in with Spotify
    </button>
  );
}

export default SpotifySignIn;