import {  useEffect, useState } from 'react';
import { useAuth } from '../../context/Auth';
import Layout from '../Layout';
import { supabase } from '../../supabaseClient';
import { DashboardLayout } from './DashboardLayout';
import NewRecipeTestObject from './NewRecipeTestObject';
import { StepOneComponent } from '../../components/Recipes/instructions/StepOneComponent';
import { StepTwoComponent } from '../../components/Recipes/instructions/StepTwoComponent';
import { StepThreeComponent } from '../../components/Recipes/instructions/StepThreeComponent';
import { StepFourComponent } from '../../components/Recipes/instructions/StepFourComponent';
import { Ingredients } from '../../components/Recipes/Ingredients';
import { useData } from '../../context/Data';

function RenderView ({props} : {props : any}) {
  
  const {view, handleSubmitToDatabase, loading} = props

  
  if (view.length === 0) {
    return (<StepOneComponent props={props} />)
  } else if (view.length === 1){
    return ( <StepTwoComponent props={props} />)
  } else if (view.length === 2) {
    return (<StepThreeComponent props={props} />)
  } else if (view.length === 3) {
    return (<StepFourComponent props={props} />)
  } else if (view.length === 4) {
    return (
      <Ingredients props={props} />
    )
  } else {
    return (
      <div className='mt-8 min-w-full mx-auto'>
        <form method="post" onSubmit={handleSubmitToDatabase} >
        <h3>Klaar om je recept op te sturen?</h3>
      <button type='submit' disabled={loading} className='hover:bg-gray-200'>
        {loading ? 'Loading...' : 'Submit'}</button>
    </form>
      </div>
    )
  }

}

/* 
  React.memo is a higher-order component that renders the component only if props are changed.
*/

export function Dashboard() {
  const { user, menu } = useAuth();
  const { dev } = useData();
  const [loading, setLoading] = useState<boolean>(false);
  const [intermediateFormData, setIntermediateFormData] = useState<any>()
  const [steps, setSteps] = useState<boolean>(false)
  const [instructions, setInstructions] = useState<any[]>([])
  const [ingredients, setIngredients] = useState<any[]>([])
  const [view, setView] = useState<any[]>([])

  const props = {
    instructions,
    setInstructions,
    view,
    setView,
    loading,
    handleSubmitToDatabase,
    ingredients,
    setIngredients
  }

  useEffect(() => {
    /* dev only */
    // setIntermediateFormData(NewRecipeTestObject)
    // setSteps(true)

    // setView([1,2,3,4,5])
    /* dev */
  }, [])
 

  async function handleSubmitToDatabase(e:any) {
    e.preventDefault()
    setLoading(true)
    console.log(instructions.flat(1))
    /* check data saved to state for description of the recipe */
    
    const { error } = await supabase
    .from('recipes')
    .insert({
      user_id: user.id,
      instructions: {
        stepTitle: ['Stap 1: Voorbereiding', 'Stap 2: Koken of bakken', 'Stap 3: Koken of bakken', 'Stap 4: Serveren' ],
        intermediateSteps: dev ? intermediateFormData.instructions : instructions.flat(1),
      },
      recipename: intermediateFormData.recipename,
      byline: intermediateFormData.byline,
      labels: intermediateFormData.labels,
      totaltime: intermediateFormData.totalTime,
      calories: intermediateFormData.calories,
      ingredients
    })

    if (error) {
      setLoading(false)
      console.log(error)
      alert('Error occurred!')
    } else {
      setLoading(false)
      setView([])
      setSteps(false)
      setIngredients([])
      alert('Entry uploaded!')
    }
    
  }

  async function handleSubmit(e: any) {
   
      e.preventDefault()
      setLoading(true)
      const form = e.target;
      const formData = new FormData(form)    
      const formObject = Object.fromEntries(formData.entries());
      const labels = formObject.labels.toString()
      const splitLabels = labels.split(',')
 

      setIntermediateFormData({
        user_id: user.id,
        recipename: formObject.recipeName,
        byline: formObject.byline,
        labels: splitLabels,
        totalTime: Number(formObject.totalTime),
        calories: formObject.calories
        
      })
      setLoading(false)
      setSteps(true)
       
  }


  if (steps) {
    
    return (
      <Layout menu={menu}>
        <DashboardLayout>
         
           <RenderView props={props} />
        </DashboardLayout>
      </Layout>
      
    )
  } else {
    return (
      <Layout menu={menu}>
        <DashboardLayout>
          
              <form method="post" onSubmit={handleSubmit}>
                  <h1>Voeg een recept toe</h1>
                  <label htmlFor='recipeName'>Geef je recept een naam (bv "Penne in aubergine-roomsaus"): </label>
                  <input name='recipeName'  className="my-3" type='text'  />
  
                  <label htmlFor='byline'>Voor onder de titel (bv "met semi-gedroogde tomaten, geraspte kaas en vers basilicum"):</label>
                  <input name='byline' className="my-3" type='text'  />
  
                  <label htmlFor='labels'>Labels. Gebruik komma voor meerdere labels (bv. veggie,lekker snel,HelloFresh):</label>
                  <input name='labels' className="my-3" type='text'  />
  
                  <label htmlFor='totalTime' >Totale tijd:</label>
                  <input name='totalTime' className="my-3" type='number'  />
  
                  <label htmlFor='calories' >Calorieën (per portie):</label>
                  <input name='calories' className="my-3" type='number'  />
  
                  <button type='submit' disabled={loading}>
                  {loading ? 'Loading...' : 'Volgende'}</button>
                </form> 
         
          </DashboardLayout>
        </Layout>
     
    );
  }
}
