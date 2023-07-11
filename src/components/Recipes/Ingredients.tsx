export function Ingredients ({props} : { props: any}) {

  const {setView, ingredients, setIngredients} = props

  function handleSubmit () {
    setView((prevView : any) => {
      return [
        ...prevView,
        5
      ]
    })
  }

  function handleSubmitIngredient (e : any) {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form)    
    const formObject = Object.fromEntries(formData.entries());

    setIngredients((prev : any) => {
      return [
        ...prev,
        formObject
      ]
    })

    e.target.reset()
  }

  return (
    <div className="w-full">
      <div className="my-3">
      <h1>Ingrediënten</h1>
      <p>Geef een lijst van ingrediënten op met bijbehorende hoeveelheden.</p>
      </div>
      <form id="ingredient-form" action="post" onSubmit={handleSubmitIngredient}>

      <label htmlFor="ingredient"><strong>Ingrediënt (bv rijst)</strong></label>
      <input name='ingredient'  className="my-3" type='text'  />

      <label htmlFor="amount"><strong>Hoeveelheid (bv. 100 gram)</strong></label>
      <input name='amount'  className="my-3" type='text'  />

        <button type="submit">Voeg toe</button>
      </form>

      <p className="my-3"><strong>Lijst:</strong> {ingredients.map(({ingredient, amount, index} : {ingredient: any, amount: any, index: any}) => {
        return (
          <span key={index} className="block mx-3">
            <span className="mx-3">Ingrediënt: {ingredient}</span>
          <span>Hoeveelheid: {amount}</span>
          </span>
        )
      }) }</p>

      <form action="post" onSubmit={handleSubmit}>
        <p><strong>Klaar?</strong></p>
        <button type="submit">Volgende stap</button>
      </form>
    </div>
  )
}