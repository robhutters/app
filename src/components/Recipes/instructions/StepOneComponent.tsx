export function StepOneComponent ({props} : { props: any}) {

  const {instructions, setInstructions, setView} = props

  function handleSubmit (e: any) {
      e.preventDefault()
     /* Handle the incoming instructions */
     const form = e.target;
     const formData = new FormData(form)
     const formObject = Object.fromEntries(formData.entries());
     const stepsArray = [formObject]
 
     const mutateStepsObject = stepsArray.map(function (item) {
       return [
               item["stap1-tussenstap-1"], 
               item["stap1-tussenstap-2"], 
               item["stap1-tussenstap-3"],
               item["stap1-tussenstap-4"]
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
        1
      ]
    })

  }

  return (
    <div>
            <h1>Omschrijving Instructies</h1>
            <p>Elk gerecht bestaat uit maximaal vier stappen en een korte reeks instructies. Minimaal 1 instructie per stap.</p>
  
           <form action="post" onSubmit={handleSubmit}>
           <h3>1. Voorbereiding</h3>
            <label htmlFor="stap1-tussenstap-1">Bijv. snij de ui in halve ringen</label>
            <input name='stap1-tussenstap-1'  className="my-3" type='text'  />
            <label htmlFor="stap1-tussenstap-2">Bijv. Verwarm de oven op 200 graden</label>
            <input name='stap1-tussenstap-2'  className="my-3" type='text'  />
            <label htmlFor="stap1-tussenstap-3">Bijv. Snij de peen in kleine stukjes</label>
            <input name='stap1-tussenstap-3'  className="my-3" type='text'  />
            <label htmlFor="stap1-tussenstap-4">Bijv. Kook water voor de aardappelen</label>
            <input name='stap1-tussenstap-4'  className="my-3" type='text'  />
            <button type="submit">Volgende</button>
           </form>
    </div>
  )
}