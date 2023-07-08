import { useContext, useState,useEffect } from 'react';
import Layout from '../Layout';
import { AuthContext,useAuth } from '../../context/Auth';
import getUserData from '../../helpers/getUserData';
import IProfile from '../../interfaces/IProfile';
import { supabase } from '../../supabaseClient';
import userOnDesktop from '../../helpers/userOnDesktop';
import recipesTestObject from '../../helpers/recipesTestObject';
import { RecipeSliderMobile } from '../../components/Recipes/RecipeSliderMobile';
import DesktopLayout from '../../components/Desktop/DesktopLayout';

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

 
  const dataSetOfChoice = recipesTestObject // switch between recipesTestObject (fake) or databaseData (real)


  if (databaseData !== undefined && loading !== true && desktop === false) {
   
    return (
      <Layout context={menu} >
          <h1>Swipe rechts om te liken</h1>
          <RecipeSliderMobile recipes={dataSetOfChoice} />   
      </Layout>
    );
   } else if (databaseData !== undefined && loading !== true && desktop === true) {
     
     return (
        <Layout context={menu}>
           <h1>Like om naar je favorieten lijstje te sturen</h1>
  
          <DesktopLayout dataset={dataSetOfChoice} />
           
           
         
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
