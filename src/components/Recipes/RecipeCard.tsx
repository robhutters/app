export function RecipeCard ({ recipe } : { recipe: any}) {
  return (
    <div className="recipe-card">
      <h2>{recipe.name}</h2>
      <ul>
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

    </div>
  );
};