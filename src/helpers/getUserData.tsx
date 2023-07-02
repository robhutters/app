import { supabase } from '../supabaseClient';
import { AuthContext } from '../context/Auth'

export default async function getUserData(id:string) {
  try {
    const {data, error} = await supabase.from('profiles').select().eq("user_id", id)

    if (data !== null) {
      return data
      
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}
