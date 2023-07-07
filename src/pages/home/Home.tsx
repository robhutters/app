import { useContext, useState,useEffect } from 'react';
import Layout from '../Layout';
import './home.css';
import { AuthContext,useAuth } from '../../context/Auth';
import getUserData from '../../helpers/getUserData';
import IProfile from '../../interfaces/IProfile';
import {useSwipeable} from 'react-swipeable';
import { supabase } from '../../supabaseClient';
import HomeLayout from './HomeLayout';
import userOnDesktop from '../../helpers/userOnDesktop';
import recipesTestObject from '../../helpers/recipesTestObject';
import {HashLink} from 'react-router-hash-link'
import RecipeLayout from './RecipeLayout';
import { data } from 'autoprefixer';

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
  const [slideNumber, setSlideNumber] = useState<number>(2)
  
  const menu = useContext(AuthContext);

  useEffect(() => {
    (async function () {
   
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

 
  
  function trackSlideView(slideNumber:any, dataSetOfChoice:any, direction: string) {
    const dataSetSize = dataSetOfChoice.length 

    if (slideNumber < dataSetSize && direction === "next") {
       setSlideNumber(slideNumber + 1) 
    } else {
      setSlideNumber(1)
    }

    
  }
  
  const dataSetOfChoice = recipesTestObject // switch between recipesTestObject (fake) or databaseData (real)


  if (databaseData !== undefined && loading !== true && desktop === false) {
   
    return (
      <Layout context={menu} >
          <h1>Swipe rechts om te liken</h1>
          <RecipeSlider recipes={dataSetOfChoice} />   
      </Layout>
    );
   } else if (databaseData !== undefined && loading !== true && desktop === true) {
     
     return (
        <Layout context={menu}>
          <HomeLayout>
            <h1>Like om naar je favorieten lijstje te sturen</h1>
           
          
           
            <div className='py-4'>
                <span onClick={() => trackSlideView(slideNumber, dataSetOfChoice, "next")} >
              <HashLink id="testButton" smooth to={`/#${slideNumber}`} className="btn btn-secondary"><p className='text-2xl'>Volgende</p></HashLink>
            </span>
            </div>
      
        
          
         
      
            

            <div className="carousel w-full">
            {dataSetOfChoice !== null ? dataSetOfChoice.map((recipe,index) => {
              const nextIdentifier = index + 1
              
              return (
                    <div id={nextIdentifier.toString()} key={index} className="carousel-item w-full "> 
                     
                      {/* <a href="#slide2" className="btn btn-circle">❮</a>  */}

                        <RecipeLayout recipe={recipe} />
                      {/* <a href="#slide4" className="btn btn-circle">❯</a> */}
                    </div>
                    
              )
            }) : ''}
          </div> 
         
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
