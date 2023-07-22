import { toast } from "react-toastify"
import { supabase } from "../supabaseClient"


export async function deleteFavourite(recipe:any, user: any, auth:any) {
  if (user !== null) {
    
      const { error } = await supabase
      .from('favourites') // updating joint table
      .delete()
      .eq('user_id', auth.user.id)
      .eq('recipe_id', recipe.id)
      
      if (error) {           
        toast ('Error: neem contact op met ontwikkelaar.')
      }     
  }

} 