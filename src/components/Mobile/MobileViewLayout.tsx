import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { MobileViewRecipeCard } from "./MobileViewRecipeCard";
import { useData } from "../../context/Data";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
import { deleteFavourite } from "../../helpers/deleteFavourite";

/* Layout used to display Favourites and the Home page */

export function MobileViewLayout ({ recipes, favourites } : { recipes: any[] | null, favourites: boolean}) {

  const [warning, setWarning] = useState<boolean>(false)
  const auth = useAuth()
  const { user } = auth
  
  async function handleLike(recipe:any) {

    if (user === null && warning === false) {
      setWarning(true)
      toast('Maak account aan om op te slaan.')

    } else if (user !== null) {
     
        const { data, error } = await supabase
        .from('favourites') // updating joint table
        .insert({ favourite: true, user_id: auth.user.id, recipe_id: recipe.id  })
        .select()
        
      if (error) {
        toast('Error: Neem contact op met de ontwikkelaar.')
      } else {
        toast('Nieuw recept aan favorieten toegevoegd!')
      }
    }    
  } 
 

  if (recipes !== null) {

    const [activeIndex, setActiveIndex] = useState(0);

    const handlers = useSwipeable({
      onSwipedLeft: (eventData) =>{
        if (favourites) deleteFavourite(currentRecipe, user, auth)
        if (activeIndex + 1 !== recipes.length) setActiveIndex((prevIndex) => Math.min(prevIndex + 1, recipes.length - 1));
        else {
        toast('Einde recepten database!')
       }
      },
      onSwipedRight: (eventData) => {
        
        if (!favourites && activeIndex + 1 !== recipes.length) handleLike(currentRecipe)
        if (activeIndex + 1 !== recipes.length) setActiveIndex((prevIndex) =>
        Math.min(prevIndex + 1, recipes.length - 1)
        
      ); else {
        toast('Einde recepten database!')
      }
      }
    });

    const currentRecipe = recipes[activeIndex];

    return (
        <div {...handlers} className="flex flex-col flex-grow "> 
          <MobileViewRecipeCard recipe={currentRecipe} />
        </div>
      )
  } else {
    return (
      <div>
        <p>No valid data found.</p>
      </div>
    )
  }
};