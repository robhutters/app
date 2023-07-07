import { useContext, useState,useEffect } from 'react';
import Layout from '../Layout';
// import './home.css';
import { AuthContext,useAuth } from '../../context/Auth';
import getUserData from '../../helpers/getUserData';
import IProfile from '../../interfaces/IProfile';
import {useSwipeable} from 'react-swipeable';
import { supabase } from '../../supabaseClient';
import HomeLayout from './HomeLayout';
import userOnDesktop from '../../helpers/userOnDesktop';

function Home() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IProfile>({
    username: null,
    first_name: null,
    last_name: null,
  } as IProfile);

  const [databaseData, setDatabaseData] = useState<any[] | null | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [desktop, setDesktop] = useState<boolean | null>(null)
  
  const menu = useContext(AuthContext);

  useEffect(() => {
    (async function () {
      console.log('fetching data')
      const view = await userOnDesktop()
      if (view === true) setDesktop(true)
      else setDesktop(false)
      const {data, error} = await supabase.from('recipes').select()
    if (!error) {
      setDatabaseData(data) 
      setLoading(false)
    }
    else alert(error)
    })()
  
   if (user !== null) {
    (async function () {
      
      const profile = await getUserData(user.id);
      if (profile !== undefined) {
        setProfile(profile[0]);
      }
    })();
   } 

    
  }, []); 

  const recipes = [
    {
      name: 'Recipe 1',
      ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
      instructions: 'Instructions for Recipe 1',
    },
    {
      name: 'Recipe 2',
      ingredients: ['Ingredient 4', 'Ingredient 5', 'Ingredient 6'],
      instructions: 'Instructions for Recipe 2',
    },
    // Add more recipes as needed
  ];

  const dataFromDatabaseForm = [ {
    id: 1,
    user_id: 123,  
    created_at: 'time',
    name: 'TestRecipe',
    byline: 'Met room en gehaktballetjes',
    labels: ['vegan'],
    description: 'Een onzin gerecht',
    prepTime: 10,
    cookTime: 14,
    totalTime: 24,
    instructions: {
      step1Title: 'Step 1 title',
      step2Title: 'Step 2 title',
      step3Title: 'Step 3 title',
      step4Title: 'Step 4 title',
      step1IntermediateSteps: [],
      step2IntermediateSteps: [],
      step3IntermediateSteps: [],
      step4IntermediateSteps: [],
    },
    ingredients: [
      'bananen', 'aardbeien', 'slagroom'
    ],
    comments: [],
    calories: 1000
  }]


  const RecipeCard = ({ recipe } : { recipe: any}) => {
    return (
      <div className="recipe-card">
        <h2>{recipe.name}</h2>
        <ul>
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
  
      </div>
    );
  };

  const RecipeSlider = ({ recipes } : { recipes: any[] | null}) => {
    if (recipes !== null) {
      const [activeIndex, setActiveIndex] = useState(0);

      const handlers = useSwipeable({
        onSwipedLeft: (eventData) =>{
          console.log("User Swiped left!", eventData)
          setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        },
        onSwipedRight: (eventData) => {
          console.log("User swiped right!", eventData)
          setActiveIndex((prevIndex) =>
          Math.min(prevIndex + 1, recipes.length - 1)
        );
        }
      });
  
      const currentRecipe = recipes[activeIndex];
      return <div {...handlers}> 
      <RecipeCard recipe={currentRecipe} />
    </div>;
    } else {
      return <div>
        <p>No valid data found.</p>
      </div>
    }

    

  
    
  };
  
 
  

  if (databaseData !== undefined && loading !== true && desktop === false) {
   
    return (
      <Layout context={menu} >
          <RecipeSlider recipes={databaseData} />   
      </Layout>
    );
   } else if (databaseData !== undefined && loading !== true && desktop === true) {
     return (
        <Layout context={menu}>
          <HomeLayout desktop={desktop}>
            <p>We are on a desktop.</p>
          </HomeLayout>
        </Layout>
     )
   } else {
    return (
      <Layout context={menu}>
        <p>Loading data ...</p>
      </Layout>
    )
   } 
  } 


export default Home;
