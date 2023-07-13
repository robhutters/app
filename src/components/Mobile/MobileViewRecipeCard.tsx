
import MobileRecipeLayout from "./MobileRecipeLayout";

export function MobileViewRecipeCard ({ recipe } : { recipe: any}) {
  return (
    <div className="flex flex-col flex-grow border-2 border-black">
    
        <section className="p-3 flex flex-col flex-grow">
         
          
          {/* main takes up all available space thanks to flex-auto. Flex container with flex-grow required. Parents included.  */}
          <main className="flex-auto">
            <MobileRecipeLayout recipe={recipe} />
          </main>
      
        </section>
    
      

    </div>
  );
};