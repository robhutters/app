import { useEffect, useState,useContext,useRef } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/Auth';
import { AuthContext } from '../../context/Auth';
import Layout from '../Layout';
import IProfile from '../../interfaces/IProfile';
import getUserData from '../../helpers/getUserData';
import { supabase } from '../../supabaseClient';

/* 
  React.memo is a higher-order component that renders the component only if props are changed.
*/

export function Dashboard() {
  // Get current user and signOut function from context
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<IProfile>({
    username: null,
    last_name: null,
    first_name: null,
  } as IProfile);

  const menu = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);

  const [steps, setSteps] = useState<{ [key: string] : number;}[]>([{
    stap1: 0,
    stap2: 0,
    stap3: 0,
    stap4: 0
  }])

  const [components, setComponent] = useState<any[]>([
    {
      stap1: [],

    },
    {
      stap2: [],

    },
    {
      stap3: [],

    },
    {
      stap4: [],

    }
  ])

  const history = useHistory();

  useEffect(() => {
    (async function () {
      setLoading(true)
      const profile = await getUserData(user.id);
      
      if (profile !== undefined) {
        setProfile(profile[0]);
        setLoading(false)
      }
    })();
  }, []);

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push('/login');
  }

  async function addStep(e:any) {
    console.log(components)
    const name = e.target.name
    console.log('Clicked the button!')
    const updateSteps = steps.map(object => ({
      ...object,
      [name]: object[name] += 1
    }))
    setSteps(updateSteps)
    console.log(steps)

    let componentsToStore:any = [
      {
        stap1: [],

      },
      {
        stap2: [],

      },
      {
        stap3: [],

      },
      {
        stap4: [],

      }
    ] 

    let componentsToRender




    for (const [key, value] of Object.entries(steps[0])) {
      console.log(`Key: ${key}, value: ${value}`)
      for (let i = 0; i < value; i++) {
      
        // push a component to an array to handle item rendering
        
        
          const components = componentsToStore.map((itemInArray:any ) => {
           
            if (itemInArray.hasOwnProperty(key)) {
              let components = []
              for (let i = 0; i < value; i++) { 
                components.push({ name: [key]})
               }
              return {
                [key]: components
              } 
            } else {
              return itemInArray
            }
            
          })
          componentsToRender = components
        
      }
    }
  
    setComponent(componentsToRender)
    
  }

  
  

  async function handleSubmit(e:any) {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form)
  
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject)

    const stepsArray = [formObject]

    const mutateStepsObject = stepsArray.map(function (item) {
      return {
          step1Title: item.stepOne,
          step2Title: item.stepTwo,
          step3Title: item.stepThree,
          step4Title: item.stepFour,
          step1IntermediateSteps: [item["stap1-tussenstap-1"], item["stap1-tussenstap-2"], item["stap1-tussenstap-3"],item["stap1-tussenstap-4"],item["stap1-tussenstap-5"]],
          step2IntermediateSteps: [item["stap2-tussenstap-1"], item["stap2-tussenstap-2"], item["stap2-tussenstap-3"],item["stap2-tussenstap-4"],item["stap2-tussenstap-5"]],
          step3IntermediateSteps: [item["stap3-tussenstap-1"], item["stap3-tussenstap-2"], item["stap3-tussenstap-3"],item["stap3-tussenstap-4"],item["stap3-tussenstap-5"]],
          step4IntermediateSteps: [item["stap4-tussenstap-1"], item["stap4-tussenstap-2"], item["stap4-tussenstap-3"],item["stap4-tussenstap-4"],item["stap4-tussenstap-5"]],
          
      }
  })

    const steps = mutateStepsObject[0]

    const { error } = await supabase
    .from('recipes')
    .insert({
      user_id: user.id,
      instructions: steps,
      recipename: formObject.recipeName,
      byline: formObject.byline,
      labels: [formObject.labels],
      description: formObject.description,
      cookTime: formObject.cookTime,
      prepTime: formObject.prepTime,
      totalTime: formObject.totalTime,
      calories: formObject.calories
      
    })

    if (error) {
      alert('Error occurred!')
    } else {
      setSteps([{}])
      alert('Entry uploaded!')
    }
    
  }

  function AddItem({name, index} : {name: string, index: number}) {
    return (
    <div>
      <label htmlFor={`${name}-tussenstap-${index + 1}`}>{`${name} - tussenstap ${index + 1}`}</label>
        <input className="my-3" name={`${name}-tussenstap-${index + 1}`} ></input>
    </div>
        
     
    )
    
  }

  return (
    <div>
      <Layout context={menu}>
          {/* Change it to display the user ID too 👇*/}
      <section  className='flex flex-col  ' >

        <main className='flex md:flex-row md:justify-around flex-col'>
          <section className=" mx-8 py-6 mb-8">
          <div className="py-6">
          <p>Welcome, <strong>{profile?.first_name}</strong>!</p>
          <p>Your user id is {user.id}</p>
          </div>
          <button onClick={handleSignOut} className='w-full'>Sign out</button>
          </section>
         
          <section className="flex flex-col max-w-xl">
            <form method="post" id="submitRecipeForm" onSubmit={handleSubmit}>
                <h1>Voeg een recept toe</h1>
                <label htmlFor='recipeName'>Geef je recept een naam:</label>
                <input name='recipeName'  className="my-3" type='text'  />

                <label htmlFor='byline'>Voor onder de titel:</label>
                <input name='byline' className="my-3" type='text'  />

                <label htmlFor='labels'>Labels (b.v. vegan):</label>
                <input name='labels' className="my-3" type='text'  />

                <label htmlFor='prepTime' >Voorbereidingstijd:</label>
                <input name='prepTime' className="my-3" type='text'  />

                <label htmlFor='cookTime' >Kooktijd:</label>
                <input name='cookTime' className="my-3" type='text'  />

                <label htmlFor='totalTime' >Totale tijd:</label>
                <input name='totalTime' className="my-3" type='text'  />

                <label htmlFor='calories' >Calorieën:</label>
                <input name='calories' className="my-3" type='text'  />

                <label htmlFor='description' >Beschrijving:</label>
                <br />
                <textarea name='description' className="my-3 w-full border-2 border-black" rows={5}  wrap="soft" />
                
                <h1>Beschrijf het kookproces in 4 stappen</h1>
                <p>Elke stap mag kleinere stapjes bevatten, maar niet meer dan 5.</p>

                <label htmlFor='stepOne' ><strong>Naam stap 1:</strong></label>
                <input name='stepOne' className="my-3" type='text'  />

                <p>Beschrijving stap 1</p>
                <button disabled={steps[0].stap1 > 4} type="button" name="stap1" onClick={addStep}>{ steps[0].stap1 < 5? 'Voeg stap toe' : 'Helaas' }</button>
                <p>{console.log('Rendering ...')}</p>
               {components[0].stap1.map((itemInArray:any, index:any) => <AddItem key={`${itemInArray.name}-tussenstap-${index + 1}`} index={index} name={itemInArray.name} />)}

                <label htmlFor='stepTwo' ><strong>Naam stap 2:</strong></label>
                <input name='stepTwo' className="my-3" type='text'  />

              

                <p>Beschrijving stap 2</p>
                <button disabled={steps[0].stap2 > 4} type="button" name="stap2" onClick={addStep}>{ steps[0].stap2 < 5? 'Voeg stap toe' : 'Helaas' }</button>

                {components[1].stap2.map((itemInArray:any, index:any) => <AddItem key={`${itemInArray.name}-tussenstap-${index + 1}`} index={index} name={itemInArray.name} />)}
             

                <label htmlFor='stepThree' ><strong>Naam stap 3:</strong></label>
                <input name='stepThree' className="my-3" type='text'  />

                <p>Beschrijving stap 3</p>
                <button disabled={steps[0].stap3 > 4} type="button" name="stap3" onClick={addStep}>{ steps[0].stap3 < 5? 'Voeg stap toe' : 'Helaas' }</button>

                {components[2].stap3.map((itemInArray:any, index:any) => <AddItem key={`${itemInArray.name}-tussenstap-${index + 1}`} index={index} name={itemInArray.name} />)}

                <label htmlFor='stepFour' ><strong>Naam stap 4:</strong></label>
                <input name='stepFour' className="my-3" type='text'  />

                <p>Beschrijving stap 4</p>
                <button disabled={steps[0].stap4 > 4} type="button" name="stap4" onClick={addStep}>{ steps[0].stap4 < 5? 'Voeg stap toe' : 'Helaas' }</button>

                {components[3].stap4.map((itemInArray:any, index:any) => <AddItem key={`${itemInArray.name}-tussenstap-${index + 1}`} index={index} name={itemInArray.name} />)}

                <button type='submit' disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}</button>
              </form>
              
          </section>

          
        </main>
      </section>
      </Layout>
    </div>
  );
}
