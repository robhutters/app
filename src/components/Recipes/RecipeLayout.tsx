import {useEffect, useState} from 'react'
import { useData } from '../../context/Data'
import { supabase } from '../../supabaseClient'
import { useAuth } from '../../context/Auth'

function ImageOrInstructions ({isImage, isView, instructions, trackedStep, setTrackedStep, ingredients} : {isImage: boolean, instructions: any, trackedStep: any, setTrackedStep: any, ingredients: any, isView: boolean}) {
 

  function loopTrackedSteps (trackedStep:number) {
    
    if (trackedStep < 3) return trackedStep + 1
    else return 0
  }

 if (isImage && isView !== true) {
  return (
   
    <img src="https://placehold.co/400x400" alt="placeholder" />
 
  )
 } else if (isImage === false && isView === false){
  return (
    <section className='w-[400px]'>
      <div className='flex flex-row justify-end my-4'>
        <button onClick={() => setTrackedStep(loopTrackedSteps) } className='btn btn-secondary'>Volgende stap</button>
      </div>
      <h3>{instructions.stepTitle.map((stepName:any, index:number) => {
        if (trackedStep == index) return stepName
      })}</h3>
      {instructions.intermediateSteps.map((step:any, index:any) => {
      
        if (trackedStep == index) {
          return step.map((reeks :any, index: number) => <p key={index}>{reeks}</p>)
        }
      })}

      
    </section>
  )

 } else {
  

 
  return (
   <section className='w-[400px]'>
     <div>
      <h3>Ingrediënten</h3>
      {ingredients.map((ingredient:any, index:number) => <p key={index}>{ingredient}</p>)}
    </div>
   </section>
  )
 }
}

export default function RecipeLayout ({recipe, favourites} : {recipe : any, favourites: boolean}) {
  const [image, setImage] = useState<boolean>(true)
  const [view, setView] = useState<boolean>(false)
  const [trackedStep, setTrackedStep] = useState<number>(0)
  const [favourite, setFavourite] = useState<boolean>()
  const recipes = useData()
  const {user} = useAuth()
  const {dummyData, dev } = recipes

  useEffect(() => {
    setFavourite(favourites)
  },[])
 

  async function handleLike() {
   

    if (dev) {
      dummyData.filter((item) => item.id === recipe.id ).map((recipe) => recipe.favourite = !favourites)
      console.log('Updating dataset!')
      console.log(dummyData)
      setFavourite(!favourites)


    } else {
      if (!favourite) {
        const { data, error } = await supabase
        .from('favourites')
        .insert({ favourite: true, user_id: user.id, recipe_id: recipe.id  })
        .select()

        setFavourite(!favourite)

        if (error) {
          console.log(error)
          alert ('Er ging iets mis met updaten! Neem contact op met de ontwikkelaar.')
        }
      } else {
        console.log('Unliking!')
        const { data, error } = await supabase
        .from('favourites') // updating joint table
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipe.id)
        
        setFavourite(!favourite)
        if (error) {
          console.log(error)
          alert ('Er ging iets mis met updaten! Neem contact op met de ontwikkelaar.')
        } else {
          console.log('Deleted from favourites.')
        }
      }


     
    }
    
    
   
  } 

  return (
    <div className="w-5/6 h-[32rem] border-2 border-black ">
                      
    <section className='p-6 flex flex-col min-h-full'>
      <div className='flex-grow' >
       <div className="flex flex-row justify-between">
        <section>
            <p><strong>Totale tijd:</strong> {recipe.totalTime} minuten</p>
            <h1>{recipe.id}</h1>
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
          <section>
            <ImageOrInstructions 
            isImage={image} 
            isView={view}
            instructions={recipe.instructions} 
            trackedStep={trackedStep} 
            setTrackedStep={setTrackedStep}
            ingredients={recipe.ingredients}
            />
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
          <button className="btn btn-primary w-32" onClick={() => handleLike() }>{favourite ? 'unlike' : 'like!'}</button>
      </div>
    </section>
  </div>
  )
}

