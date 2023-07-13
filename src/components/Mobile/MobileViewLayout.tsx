import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { RecipeCard } from "../Recipes/RecipeCard";
import { MobileViewRecipeCard } from "./MobileViewRecipeCard";

export function MobileViewLayout ({ recipes } : { recipes: any[] | null}) {
  console.log(recipes)
  if (recipes !== null) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlers = useSwipeable({
      onSwipedLeft: (eventData) =>{
        console.log("User Swiped left!", eventData)
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      },
      onSwipedRight: (eventData) => {
        console.log("User swiped right!", eventData)
        setActiveIndex((prevIndex) =>
        Math.min(prevIndex + 1, recipes.length - 1)
      );
      }
    });

    const currentRecipe = recipes[activeIndex];
    return (<div {...handlers} className="flex flex-col flex-grow "> 
          {/* <MobileViewRecipeCard recipe={currentRecipe} /> */}
          <div className="flex flex-col flex-grow">
             <p className="border-2 border-purple-400">Testing flex 1</p>
             <p className="border-2 flex-auto border-purple-400">Testing flex 2</p>
             <p className="border-2  border-purple-400">Testing flex 3</p>
          </div>
          
          
      </div>)
  } else {
    return <div>
      <p>No valid data found.</p>
    </div>
  }
};