import {useEffect, useState} from 'react'
import { useData } from '../../context/Data'
import { supabase } from '../../supabaseClient'

function ImageOrInstructions ({isImage, isView, instructions, trackedStep, setTrackedStep, ingredients} : {isImage: boolean, instructions: any, trackedStep: any, setTrackedStep: any, ingredients: any, isView: boolean}) {
 

  function loopTrackedSteps (trackedStep:number) {
    
    if (trackedStep < 3) return trackedStep + 1
    else return 0
  }

 if (isImage && isView !== true) {
  return (
   
   <div className='flex flex-row justify-center'>
     <img src="https://placehold.co/300x300" alt="placeholder" />
   </div>
 
  )
 } else if (isImage === false && isView === false){
  return (
    <section className='h-[300px]'>
      <div className='flex flex-row justify-end'>
        <button onClick={() => setTrackedStep(loopTrackedSteps) } className='btn btn-secondary'>Volgende stap</button>
      </div>
      <h3>{instructions.stepTitle.map((stepName:any, index:number) => {
        if (trackedStep == index) return stepName
      })}</h3>
      {instructions.intermediateSteps.map((step:any, index:any) => {
      
        if (trackedStep == index) {
          return step.map((reeks :any, index:number) => <p key={index}>{reeks}</p>)
        }
      })}

      
    </section>
  )

 } else {
  

 
  return (
   <section >
     <div>
      <h3>Ingrediënten</h3>
      {ingredients.map((ingredient:any, index: number) => <p key={index}>{ingredient}</p>)}
    </div>
   </section>
  )
 }
}

export default function MobileRecipeLayout ({recipe}: {recipe : any}) {
  const [image, setImage] = useState<boolean>(true)
  const [view, setView] = useState<boolean>(false)
  const [trackedStep, setTrackedStep] = useState<number>(0)

  return (
    <div >
                      
    <section className='flex flex-col'>
      <div className='flex-grow' >
       <div className="flex flex-col justify-between">
       <section className='mb-4 h-[300px]'>
            <ImageOrInstructions 
            isImage={image} 
            isView={view}
            instructions={recipe.instructions} 
            trackedStep={trackedStep} 
            setTrackedStep={setTrackedStep}
            ingredients={recipe.ingredients}
            />
          </section>
        <section className='mb-6'>
            <p><strong>Totale tijd:</strong> {recipe.totalTime} minuten</p>

            <h2>{recipe.recipename}</h2>
            <p>{recipe.byline}</p>
            <div className="pt-4">
              {recipe.labels.map((label:any, index:number) => <small key={index} className="border-2 rounded py-2 px-4">{label}</small>)}
            </div>
            <div className="pt-4">
              <h4>Omschrijving</h4>
              <p>{recipe.description}</p>
            </div>
            
           
          </section>
         
        
       </div>
        
      </div>
      <div className="card-actions justify-end">

          <button disabled={view} className="btn btn-primary w-32" onClick={() => {
            setImage(!image)
            
          }}>{ image === true && view === false ? 'instructies' : 'foto'}</button>
          <button  className="btn btn-primary w-32" onClick={() => {
            setView(!view)
            setImage(!image)
          }}>{ view === false && image === true ? 'ingrediënten' : 'terug'}</button>
          {/* <button className="btn btn-primary w-32" onClick={() => handleLike() }>{favourite ? 'unlike' : 'like!'}</button> */}
      </div>
    </section>
  </div>
  )
}

