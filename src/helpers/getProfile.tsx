import { supabase } from '../supabaseClient';

export default async function getProfile() {
  try {
    const user = supabase.auth.user();
    if (user !== null) {
      let { data, error, status } = await supabase.from('profiles').select(`username, website, avatar_url`).eq('id', user.id).single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        return {
          username: data.username,
          website: data.website,
          avatar_url: data.avatar_url,
        };
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}
