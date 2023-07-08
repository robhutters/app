import {  useEffect, useState } from 'react';
import { useAuth } from '../../context/Auth';
import Layout from '../Layout';
import { supabase } from '../../supabaseClient';
import { DashboardLayout } from './DashboardLayout';
import NewRecipeTestObject from './NewRecipeTestObject';

/* 
  React.memo is a higher-order component that renders the component only if props are changed.
*/

export function Dashboard() {
  const { user, menu } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [intermediateFormData, setIntermediateFormData] = useState<any>()
  const [steps, setSteps] = useState<boolean>(false)
  const [instructions, setInstructions] = useState<any>()

  useEffect(() => {
    /* dev only */
    setIntermediateFormData(NewRecipeTestObject)
    setSteps(true)
  }, [])
 

  async function handleSubmitToDatabase(e:any) {
    e.preventDefault()
    setLoading(true)

    /* Handle the incoming instructions */
    const form = e.target;
    const formData = new FormData(form)
  
    const formObject = Object.fromEntries(formData.entries());
   

    const stepsArray = [formObject]

    const mutateStepsObject = stepsArray.map(function (item) {
      return {
          stepTitle: [
            'Voorbereiding',
            item.stepTwo,
            item.stepThree,
            'Serveren'
          ],
          intermediateSteps: [
            [
              item["stap1-tussenstap-1"], 
              item["stap1-tussenstap-2"], 
              item["stap1-tussenstap-3"],
              item["stap1-tussenstap-4"]
            ],
            [
            item["stap2-tussenstap-1"], 
            item["stap2-tussenstap-2"], 
            item["stap2-tussenstap-3"],
            item["stap2-tussenstap-4"],
         
          ],
          [
            item["stap3-tussenstap-1"], 
            item["stap3-tussenstap-2"], 
            item["stap3-tussenstap-3"],
            item["stap3-tussenstap-4"],
          ],
          [
            item["stap4-tussenstap-1"], 
            item["stap4-tussenstap-2"], 
            item["stap4-tussenstap-3"],

          ],
        ] 
          
      }
    })

    const instructions = mutateStepsObject[0]
    setInstructions(instructions)

    /* check data saved to state for description of the recipe */
    

    const { error } = await supabase
    .from('recipes')
    .insert({
      user_id: user.id,
      instructions: intermediateFormData.dummy === true ? intermediateFormData.instructions : instructions,
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
         
          <form method="post" onSubmit={handleSubmitToDatabase} >
            <p>Elk gerecht bestaat uit maximaal vier stappen en een korte reeks instructies. Minimaal 1 instructie per stap.</p>
            <h3>1. Voorbereiding</h3>

            <label htmlFor="stap1-tussenstap-1">Bijv. snij de ui in halve ringen</label>
            <input name='stap1-tussenstap-1'  className="my-3" type='text'  />
            <label htmlFor="stap1-tussenstap-2">Bijv. Verwarm de oven op 200 graden</label>
            <input name='stap1-tussenstap-2'  className="my-3" type='text'  />
            <label htmlFor="stap1-tussenstap-3">Bijv. Snij de peen in kleine stukjes</label>
            <input name='stap1-tussenstap-3'  className="my-3" type='text'  />
            <label htmlFor="stap1-tussenstap-4">Bijv. Kook water voor de aardappelen</label>
            <input name='stap1-tussenstap-4'  className="my-3" type='text'  />
            
            <h3>2. Bijv. Aardappelen koken</h3>

            <label htmlFor="stepTwo" >Geef in twee woorden een beschrijving van stap 2</label>
            <input type="text" name="stepTwo" className="my-3"/>

            <label htmlFor="stap2-tussenstap-1">Bijv. schil de aardappelen</label>
            <input name='stap2-tussenstap-1'  className="my-3" type='text'  />
            <label htmlFor="stap2-tussenstap-2">Bijv. kook de aardappelen 20 minuten</label>
            <input name='stap2-tussenstap-2'  className="my-3" type='text'  />
            <label htmlFor="stap2-tussenstap-3">Meng in een kom: 1/2 extra vierge olijfolie en witte wijnazijn</label>
            <input name='stap2-tussenstap-3'  className="my-3" type='text'  />
            <label htmlFor="stap2-tussenstap-4">Meng de peen door het mengsel</label>
            <input name='stap2-tussenstap-4'  className="my-3" type='text'  />

            <h3>3. Bijv. Kipstukjes bakken</h3>
            <label htmlFor="stepThree">Geef in twee woorden een beschrijving van stap 3</label>
            <input type="text" name="stepThree" className="my-3" />

            <label htmlFor="stap3-tussenstap-1">Bijv. verpak de mini-tortilla's in aluminiumfolie</label>
            <input name='stap3-tussenstap-1'  className="my-3" type='text'  />
            <label htmlFor="stap3-tussenstap-2">Bijv. halveer de avocado en verwijder de pit</label>
            <input name='stap3-tussenstap-2'  className="my-3" type='text'  />
            <label htmlFor="stap3-tussenstap-3">Bijv. Snijd de witte kaas in blokjes</label>

            <input name='stap3-tussenstap-3'  className="my-3" type='text'  />
            <label htmlFor="stap3-tussenstap-4">Bijv. verhit de kipstukjes 6 minuten</label>

            <input name='stap3-tussenstap-4'  className="my-3" type='text'  />

            <h3>4. Serveren</h3>

            <label htmlFor="stap4-tussenstap-1">Bijv. leg op elk bord 3 tortilla's</label>

            <input name='stap4-tussenstap-1'  className="my-3" type='text'  />
            <label htmlFor="stap4-tussenstap-2">Bijv. zet de tomatensalsa op tafel</label>

            <input name='stap4-tussenstap-2'  className="my-3" type='text'  />
            <label htmlFor="stap4-tussenstap-3">Bijv. snijd de basilicum in reepjes</label>

            <input name='stap4-tussenstap-3'  className="my-3" type='text'  />
            <p><strong>Stuur je recept naar de database!</strong></p>
            <button type='submit' disabled={loading} className='hover:bg-gray-200'>
                  {loading ? 'Loading...' : 'Submit'}</button>
          </form>
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
                  {loading ? 'Loading...' : 'Submit'}</button>
                </form> 
         
        </DashboardLayout>
           
  
          
        </Layout>
     
    );
  }
}
