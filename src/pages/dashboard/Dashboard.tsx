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

  const [steps, setSteps] = useState<{step1: number; step2: number; step3: number, step4:number;}[]>([{
    step1: 0,
    step2: 0,
    step3: 0,
    step4: 0
  }])

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

  async function addStep() {}

  async function addStepButtonOne() {
    console.log('Clicked the button!')
    const updateSteps = steps.map(object => ({
      ...object,
      step1: object.step1 += 1
    }))
    setSteps(updateSteps)
  }

  
  

  async function handleSubmit(e:any) {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form)
  
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject)

    const { error } = await supabase
    .from('recipes')
    .insert({
      user_id: user.id,
      recipename: formObject.recipeName,
      byline: formObject.byline,
      labels: [formObject.labels],
      description: formObject.description
    })

    if (error) {
      alert('Error occurred!')
    } else {
      alert('Entry uploaded!')
    }
    
  }

  return (
    <div>
      <Layout context={menu}>
          {/* Change it to display the user ID too 👇*/}
      <section  className='flex flex-col  ' >

        <main className='flex flex-row justify-around '>
          <section className=" mx-8">
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

                <label htmlFor='stepOne' >Naam stap 1:</label>
                <input name='stepOne' className="my-3" type='text'  />

                <p>Beschrijving stap 1</p>
                <button  type="button" name="stepOneButton" onClick={addStepButtonOne}></button>

                <label htmlFor='stepTwo' >Naam stap 2:</label>
                <input name='stepTwo' className="my-3" type='text'  />

                <p>Beschrijving stap 2</p>
                <button disabled={steps > 4} type="button" onClick={addStep}>{ steps < 5? 'Voeg stap toe' : 'Helaas' } </button>

                <label htmlFor='stepThree' >Naam stap 3:</label>
                <input name='stepThree' className="my-3" type='text'  />

                <p>Beschrijving stap 3</p>
                <button disabled={steps > 4} type="button" onClick={addStep}>{ steps < 5? 'Voeg stap toe' : 'Helaas' } </button>

                <label htmlFor='stepFour' >Naam stap 4:</label>
                <input name='stepFour' className="my-3" type='text'  />

                <p>Beschrijving stap 4</p>
                <button disabled={steps > 4} type="button" onClick={addStep}>{ steps < 5? 'Voeg stap toe' : 'Helaas' } </button>

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
