import { useContext, useState,useEffect } from 'react';
import Layout from '../Layout';
// import './home.css';
import { AuthContext,useAuth } from '../../context/Auth';
import getUserData from '../../helpers/getUserData';
import IProfile from '../../interfaces/IProfile';
import {useSwipeable} from 'react-swipeable'

function Home() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IProfile>({
    username: null,
    first_name: null,
    last_name: null,
  } as IProfile);

  
  const menu = useContext(AuthContext);

  useEffect(() => {
  
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


  const RecipeCard = ({ recipe }) => {
    return (
      <div className="recipe-card">
        <h2>{recipe.name}</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p>{recipe.instructions}</p>
      </div>
    );
  };

  const RecipeSlider = ({ recipes }) => {
    const handlers = useSwipeable({
      onSwiped: (eventData) => console.log("User Swiped!", eventData),
    });
    return <div {...handlers}> You can swipe here </div>;
  
    
  };
  
  
 if (user !== null && profile !== null) {
  return (
    <Layout context={menu} >
      <section className="px-6">
        <p><strong>User logged in?</strong> {user.id} </p>
        <p><strong>Name:</strong> { profile.first_name !== null && profile.first_name.length !== 0 ? `${profile.first_name}` : 'Profile details missing.' }</p>
      </section>
      <h1>Swiiiiiipe</h1>
      <section>
      <RecipeSlider recipes={recipes} />
      </section>
    </Layout>
  );
 } else {
  return (
    <Layout context={menu} >
      <section className="px-6">
        <p>No user ...</p>
      </section>
    </Layout>
  );
 }
}

export default Home;
