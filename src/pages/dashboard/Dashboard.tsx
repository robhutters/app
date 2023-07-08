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
  } else {
    return (
      <div className='mt-8'>
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
  const [loading, setLoading] = useState<boolean>(false);
  const [intermediateFormData, setIntermediateFormData] = useState<any>()
  const [steps, setSteps] = useState<boolean>(false)
  const [instructions, setInstructions] = useState<any[]>([])
  const [view, setView] = useState<any[]>([])

  const props = {
    instructions,
    setInstructions,
    view,
    setView,
    loading,
    handleSubmitToDatabase
  }

  useEffect(() => {
    /* dev only */
    setIntermediateFormData(NewRecipeTestObject)
    setSteps(true)
  }, [])
 

  async function handleSubmitToDatabase(e:any) {
    e.preventDefault()
    setLoading(true)
    console.log(instructions)
    /* check data saved to state for description of the recipe */
    
    const { error } = await supabase
    .from('recipes')
    .insert({
      user_id: user.id,
      instructions: {
        stepTitle: ['Stap 1: Voorbereiding', 'Stap 2: Koken of bakken', 'Stap 3: Koken of bakken', 'Stap 4: Serveren' ],
        intermediateSteps: intermediateFormData.dummy === true ? intermediateFormData.instructions : instructions,
      },
      recipename: intermediateFormData.recipename,
      byline: intermediateFormData.byline,
      labels: intermediateFormData.labels,
      description: intermediateFormData.description,
      cooktime: intermediateFormData.cookTime,
      preptime: intermediateFormData.prepTime,
      totaltime: intermediateFormData.totalTime,
      calories: intermediateFormData.calories
      
    })

    if (error) {
      setLoading(false)
      console.log(error)
      alert('Error occurred!')
    } else {
      setLoading(false)
      setView([])
      alert('Entry uploaded!')
    }
    
  }

  async function handleSubmit(e: any) {
   
      e.preventDefault()
      setLoading(true)
      const form = e.target;
      const formData = new FormData(form)    
      const formObject = Object.fromEntries(formData.entries());
  
      setIntermediateFormData({
        user_id: user.id,
        recipename: formObject.recipeName,
        byline: formObject.byline,
        labels: [formObject.labels],
        description: formObject.description,
        cookTime: formObject.cookTime,
        prepTime: formObject.prepTime,
        totalTime: Number(formObject.cookTime) + Number(formObject.prepTime),
        calories: formObject.calories
        
      })
      setLoading(false)
      setSteps(true)
       
  }


  if (steps) {
    console.log(intermediateFormData)

    return (
      <Layout menu={menu}>
        <DashboardLayout>
          <h1>Omschrijving Instructies</h1>
          <p>Elk gerecht bestaat uit maximaal vier stappen en een korte reeks instructies. Minimaal 1 instructie per stap.</p>
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
                  <label htmlFor='recipeName'>Geef je recept een naam:</label>
                  <input name='recipeName'  className="my-3" type='text'  />
  
                  <label htmlFor='byline'>Voor onder de titel:</label>
                  <input name='byline' className="my-3" type='text'  />
  
                  <label htmlFor='labels'>Labels (b.v. vegan):</label>
                  <input name='labels' className="my-3" type='text'  />
  
                  <label htmlFor='prepTime' >Voorbereidingstijd:</label>
                  <input name='prepTime' className="my-3" type='number'  />
  
                  <label htmlFor='cookTime' >Kooktijd:</label>
                  <input name='cookTime' className="my-3" type='number'  />
  
                  <label htmlFor='calories' >Calorieën:</label>
                  <input name='calories' className="my-3" type='number'  />
  
                  <label htmlFor='description' >Beschrijving:</label>
                  <br />
                  <textarea name='description' className="my-3 w-full border-2 border-black" rows={5}  wrap="soft" />
                
                  <button type='submit' disabled={loading}>
                  {loading ? 'Loading...' : 'Volgende'}</button>
                </form> 
         
          </DashboardLayout>
        </Layout>
     
    );
  }
}
