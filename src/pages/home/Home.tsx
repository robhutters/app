import { useState,useEffect } from 'react';
import Layout from '../Layout';
import { useAuth } from '../../context/Auth';
import { MobileViewLayout } from '../../components/Mobile/MobileViewLayout';
import { useData } from '../../context/Data';
import DesktopLayout from '../../components/Desktop/DesktopLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const { user, menu } = useAuth(); // extract session info and profile info 
  const recipes =  useData(); // awareness of what data to render
  const [context, setContext] = useState<any>()
  const [dataset, setDataset] = useState<any[] | null | undefined>()
  const [visitor, setVisitor] = useState<boolean>(true)

  useEffect(() => {
      (async function() {
        console.log(user)

        setContext(recipes)
        if (recipes.dev) setDataset(recipes.dummyData)
        if (recipes.filtered.length > 0) setDataset(recipes.filtered)
        else setDataset(recipes.data)
        if (user === null) {
          setVisitor(false)
        }
        else { 
          
          setVisitor(true)
          toast('Meld je aan om je swipes te bewaren!')
        }
      })().then((data) => toast('Swipe rechts om te liken!')).catch(e => console.log(e))
  }, []); 


  if (dataset !== undefined && context.loading !== true) {
    
    if ( context.desktop === true) {
  
      return (
         <Layout menu={menu}>
            <h1>Like om naar je favorieten lijstje te sturen</h1>     
           <DesktopLayout dataset={dataset} favourites={false} />
           <ToastContainer />
         </Layout>
      )
    } else {
      console.log('On mobile ...')
      console.log('Dataset', dataset)
      console.log('-------------------------')
      return (
        <Layout menu={menu} >

            <MobileViewLayout recipes={dataset} favourites={false}/>   
            <ToastContainer />
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
