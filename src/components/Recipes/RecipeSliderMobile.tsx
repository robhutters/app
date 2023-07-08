import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { RecipeCard } from "./RecipeCard";

export function RecipeSliderMobile ({ recipes } : { recipes: any[] | null}) {
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
    return <div {...handlers}> 
    <RecipeCard recipe={currentRecipe} />
  </div>;
  } else {
    return <div>
      <p>No valid data found.</p>
    </div>
  }
};