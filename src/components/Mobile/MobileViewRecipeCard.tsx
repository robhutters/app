
import MobileRecipeLayout from "./MobileViewRecipeLayout";

export function MobileViewRecipeCard ({ recipe } : { recipe: any}) {
  if (recipe !== null && recipe !== undefined) {
    return (
      <div className="flex flex-col flex-grow border-2 border-black">   
          <section className="p-3 flex flex-col flex-grow">
            {/* main takes up all available space thanks to flex-auto. Flex container with flex-grow required; parents included.  */}
            <main className="flex-auto"> 
              <MobileRecipeLayout recipe={recipe} />
            </main>     
          </section>
      </div>
    );
  } else {
    return (
      <div>No recipes in database.</div>
    )
  }
};