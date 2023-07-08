export function StepThreeComponent  ({props} : {props : any}) {
  const {instructions, setInstructions, setView} = props
  console.log(instructions)

  function handleSubmit (e: any) {
      e.preventDefault()
     /* Handle the incoming instructions */
     const form = e.target;
     const formData = new FormData(form)
     const formObject = Object.fromEntries(formData.entries());
     const stepsArray = [formObject]
 
     const mutateStepsObject = stepsArray.map(function (item) {
       return [
               item["stap3-tussenstap-1"], 
               item["stap3-tussenstap-2"], 
               item["stap3-tussenstap-3"],
               item["stap3-tussenstap-4"]
             ]
            
        })

      setInstructions((prevInstructions:any) => {
        return [
          ...prevInstructions,
          mutateStepsObject
        ]
      })

       setView((prevView : any) => {
      return [
        ...prevView,
        3
      ]
    })

  }
  return (
    <div>
           <form onSubmit={handleSubmit} method="post">
            <h3>3. Bijv. Kipstukjes bakken</h3>

            <label htmlFor="stap3-tussenstap-1">Bijv. verpak de mini-tortilla's in aluminiumfolie</label>
            <input name='stap3-tussenstap-1'  className="my-3" type='text'  />
            <label htmlFor="stap3-tussenstap-2">Bijv. halveer de avocado en verwijder de pit</label>
            <input name='stap3-tussenstap-2'  className="my-3" type='text'  />
            <label htmlFor="stap3-tussenstap-3">Bijv. Snijd de witte kaas in blokjes</label>

            <input name='stap3-tussenstap-3'  className="my-3" type='text'  />
            <label htmlFor="stap3-tussenstap-4">Bijv. verhit de kipstukjes 6 minuten</label>

            <input name='stap3-tussenstap-4'  className="my-3" type='text'  />
            <button type="submit">Volgende</button>
           </form>
    </div>
  )
}