import { useLocation } from "react-router-dom";
import DesktopLayout from "../../components/Desktop/DesktopLayout";
import { useAuth } from "../../context/Auth";
import { useData } from "../../context/Data";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import filterFavourites from "../../helpers/filterFavourites";
import { MobileViewLayout } from "../../components/Mobile/MobileViewLayout";

export function Favourites () {
  const { user, profile, menu } = useAuth(); // extract session info and profile info 
  const recipes =  useData(); // awareness of what data to render
  const [context, setContext] = useState<any>()
  const [dataset, setDataset] = useState<any[] | null | undefined>()

  useEffect(() => {
      

      (async function() {

        setContext(recipes)
        if (recipes.dev) setDataset(recipes.dummyData)
        else {
         
          setDataset(recipes.favourites)
        }

       
     
      })()
  }, []); 


  if (dataset !== undefined && context.loading !== true) {
    
    if ( context.desktop === true) {
  
      return (
         <Layout menu={menu}>
            <h1>Like om naar je favorieten lijstje te sturen</h1>     
           <DesktopLayout dataset={dataset} favourites={true} />
         </Layout>
      )
    } else {
      console.log('On mobile ...')
      console.log('Dataset', dataset)
      console.log('-------------------------')
      return (
        <Layout menu={menu} >
            <h1 >Swipe <span className="text-blue-400">rechts</span> om te bladeren</h1>
            <h1 className='pb-4'>Swipe <span className="text-red-400">links</span> om te deleten</h1>

            <MobileViewLayout recipes={dataset} favourites={true} />   
          
        </Layout>
      );
    }
    
   } else {
    return (
      <Layout menu={menu}>
        <p>Loading data ...</p>
      </Layout>
    )
   } 
}