import { useState,useEffect } from 'react';
import Layout from '../Layout';
import { useAuth } from '../../context/Auth';
import recipesTestObject from '../../helpers/recipesTestObject';
import { RecipeSliderMobile } from '../../components/Recipes/RecipeSliderMobile';
import { useData } from '../../context/Data';
import DesktopLayout from '../../components/Desktop/DesktopLayout';

function Home() {
  const { user, profile } = useAuth(); // extract session info and profile info 
  const [context, setContext] = useState<any>()
  const [dataset, setDataset] = useState<any[] | null | undefined>()

  const menu = useAuth(); // awareness of how to render the menu
  const data =  useData(); // awareness of what data to render

  useEffect(() => {
   
      setContext(data)
      setDataset(data.dummyData)
      
    
  }, []); 


  if (dataset !== undefined && context.loading !== true) {
    
    if ( context.desktop === true) {
    
      return (
         <Layout context={menu}>
            <h1>Like om naar je favorieten lijstje te sturen</h1>     
           <DesktopLayout dataset={dataset} />
         </Layout>
      )
    } else {
      return (
        <Layout context={menu} >
            <h1>Swipe rechts om te liken</h1>
            <RecipeSliderMobile recipes={dataset} />   
        </Layout>
      );
    }
    
   } else {
    return (
      <Layout context={menu}>
        <p>Loading data ...</p>
      </Layout>
    )
   } 
  } 


export default Home;
