import { supabase } from "../supabaseClient"

export default async function filterFavourites(user: any, recipes:any, returnType: string) {
  console.log('Hello from function')

  const dataset = recipes

  if (dataset !== undefined) {
    const { data, error } = await supabase
      .from('favourites')
      .select()
      .eq('user_id', user.id)

      if (data !== null && returnType === 'filtered') {
        const recipeID = data.map((recipe) => {
          return recipe.recipe_id
        })
  
        const filtered = dataset.filter((recipe:any) => !recipeID.includes(recipe.id))
        return filtered
      }  else if (data !== null && returnType === 'favourites') {
        const recipeID = data.map((recipe) => {

      return recipe.recipe_id
    })

    const favourites = dataset.filter((recipe:any) => recipeID.includes(recipe.id))
    return favourites
  } else {
    return ['Error from filterFavourites helper function']
  }
  }


}