export function StepTwoComponent ({props} : {props : any}) {
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
               item["stap2-tussenstap-1"], 
               item["stap2-tussenstap-2"], 
               item["stap2-tussenstap-3"],
               item["stap2-tussenstap-4"]
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
          2
        ]
      })
  }

  return (
    <div>
       <form action="post" onSubmit={handleSubmit}>
        <h3>2. Bijv. Aardappelen koken</h3>

        <label htmlFor="stap2-tussenstap-1">Bijv. schil de aardappelen</label>
        <input name='stap2-tussenstap-1'  className="my-3" type='text'  />
        <label htmlFor="stap2-tussenstap-2">Bijv. kook de aardappelen 20 minuten</label>
        <input name='stap2-tussenstap-2'  className="my-3" type='text'  />
        <label htmlFor="stap2-tussenstap-3">Meng in een kom: 1/2 extra vierge olijfolie en witte wijnazijn</label>
        <input name='stap2-tussenstap-3'  className="my-3" type='text'  />
        <label htmlFor="stap2-tussenstap-4">Meng de peen door het mengsel</label>
        <input name='stap2-tussenstap-4'  className="my-3" type='text'  />
        <button type="submit">Volgende</button>
           </form>
    </div>
  )
}