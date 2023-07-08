export function StepFourComponent ({props} : {props : any}) {

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
               item["stap4-tussenstap-1"], 
               item["stap4-tussenstap-2"], 
               item["stap4-tussenstap-3"]
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
          4
        ]
      })

  }

  return (
    <div>
       <form action="post" onSubmit={handleSubmit}>
        <h3>4. Serveren</h3>

        <label htmlFor="stap4-tussenstap-1">Bijv. leg op elk bord 3 tortilla's</label>

        <input name='stap4-tussenstap-1'  className="my-3" type='text'  />
        <label htmlFor="stap4-tussenstap-2">Bijv. zet de tomatensalsa op tafel</label>

        <input name='stap4-tussenstap-2'  className="my-3" type='text'  />
        <label htmlFor="stap4-tussenstap-3">Bijv. snijd de basilicum in reepjes</label>

        <input name='stap4-tussenstap-3'  className="my-3" type='text'  />
        <button type="submit">Volgende</button>
       </form>
    </div>
  )
}