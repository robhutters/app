import { supabase } from '../supabaseClient';

export default async function getProfile() {
  try {
    const user = supabase.auth.getUser();
    console.log(user)
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}
