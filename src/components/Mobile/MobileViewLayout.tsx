import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { MobileViewRecipeCard } from "./MobileViewRecipeCard";
import { useData } from "../../context/Data";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../../context/Auth";



export function MobileViewLayout ({ recipes } : { recipes: any[] | null}) {
  const dataset = useData()
  const {dummyData, dev } = dataset
  const [favourite, setFavourite] = useState<any[]>([])
  const auth = useAuth()

  useEffect(() => {
    console.log('Favourites ...')
    console.log(favourite)
    console.log('-----------------------------')
  },[favourite])
  
  if (recipes !== null) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlers = useSwipeable({
      onSwipedLeft: (eventData) =>{
        console.log("User Swiped left!")
        setActiveIndex((prevIndex) => Math.min(prevIndex + 1, recipes.length - 1));
      },
      onSwipedRight: (eventData) => {
        console.log("User swiped right!")
        
        setFavourite(prev => {
          return [
            ...prev,
            currentRecipe
          ]
        })
        handleLike(currentRecipe)
        setActiveIndex((prevIndex) =>
        Math.min(prevIndex + 1, recipes.length - 1)
        
      );
      }
    });

    const currentRecipe = recipes[activeIndex];


    async function handleLike(recipe:any) {
     
      if (dev) {
        /* there's no joint table equivalent yet for dummy data */
        dummyData.filter((item) => item.id === recipe.id ).map((recipe) => {
          console.log('Recipe ...')
          console.log(recipe)
          return recipe.favourite = !recipe.favourite
        })
        console.log('Updating dummy dataset!')
        console.log(dummyData)
  
      } else {
        const { data, error } = await supabase
        .from('favourites') // updating joint table
        .insert({ favourite: true, user_id: auth.user.id, recipe_id: recipe.id  })
        .select()
        
  
        if (error) {
          console.log(error)
          alert ('Er ging iets mis met updaten! Neem contact op met de ontwikkelaar.')
        } else {
          console.log(data)
        }
      }
      
      
     
    } 



    return (<div {...handlers} className="flex flex-col flex-grow "> 
          <MobileViewRecipeCard recipe={currentRecipe} />
      </div>)
  } else {
    return <div>
      <p>No valid data found.</p>
    </div>
  }
};