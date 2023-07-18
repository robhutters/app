import { useState,useEffect } from 'react';
import Layout from '../Layout';
import { useAuth } from '../../context/Auth';
import { MobileViewLayout } from '../../components/Mobile/MobileViewLayout';
import { useData } from '../../context/Data';
import DesktopLayout from '../../components/Desktop/DesktopLayout';

function Home() {
  const { user, profile, menu } = useAuth(); // extract session info and profile info 
  const recipes =  useData(); // awareness of what data to render
  const [context, setContext] = useState<any>()
  const [dataset, setDataset] = useState<any[] | null | undefined>()

  useEffect(() => {
      

      (async function() {

        setContext(recipes)
        if (recipes.dev) setDataset(recipes.dummyData)
        else {
         
          setDataset(recipes.filtered)
        
        }

       
     
      })()
  }, []); 


  if (dataset !== undefined && context.loading !== true) {
    
    if ( context.desktop === true) {
  
      return (
         <Layout menu={menu}>
            <h1>Like om naar je favorieten lijstje te sturen</h1>     
           <DesktopLayout dataset={dataset} favourites={false} />
         </Layout>
      )
    } else {
      console.log('On mobile ...')
      console.log('Dataset', dataset)
      console.log('-------------------------')
      return (
        <Layout menu={menu} >
            <h1 className='pb-4'>Swipe rechts om te liken!</h1>

            <MobileViewLayout recipes={dataset} favourites={false}/>   
          
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


export default Home;
