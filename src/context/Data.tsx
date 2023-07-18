import { createContext, useState, useContext, useEffect } from 'react';
import userOnDesktop from '../helpers/userOnDesktop';
import DataConTextType from '../interfaces/DataContextType';
import { supabase } from '../supabaseClient';
import recipesTestObject from '../helpers/recipesTestObject';
import { useAuth } from './Auth';
import filterFavourites from '../helpers/filterFavourites';

export const DataContext = createContext({});

// whenever you need access to the values associated with DataContext provider, use this function below to access them

export function useData() {
  return useContext(DataContext) as DataConTextType;
}

export function DataProvider({ children }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [desktop, setDesktop] = useState<boolean | null>(null)
  const [databaseData, setDatabaseData] = useState<any[] | null | undefined>()
  const [dummyData, setDummyData] = useState<any[] | null | undefined>()
  const [devEnvironment, setDevEnvironment] = useState<boolean>(false)
  const { user, profile, menu } = useAuth(); // extract session info and profile info 
  const [favourites, setFavourites] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])

  useEffect(() => {
    // Check active sessions and sets the user
    (async function () {
      const view = await userOnDesktop()
      if (view === true) setDesktop(true)
      else setDesktop(false)

      const {data, error} = await supabase.from('recipes').select()

      if (!error && user !== null)  {
        setDatabaseData(data)
        console.log('Data from data context')
        console.log(data)
        console.log('--------------------')

        const favourites = await filterFavourites(user, data, 'favourites')
        console.log('Favourites from data context')
        console.log(favourites)
        console.log('--------------------')
        setFavourites(favourites)
        const renderedData = await filterFavourites(user, data, 'filtered')
        console.log('Data to render ...')
        console.log(renderedData)
        console.log('--------------------')
        setFiltered(renderedData)
      }
      else {
        setDatabaseData(data)
        console.log('Data from data context')
        console.log(data)
        console.log('--------------------')
       
      }
    


      setDummyData(recipesTestObject)
      setDevEnvironment(false)
      setLoading(false)
      console.log('Data context finished loading.')


        // Listen for changes on state
        supabase
          .channel('schema-db-changes')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
            },
            (payload) => {
              console.log('Hello from Postgres channel!')
              console.log(payload)
              console.log('Updating data context!')
              if (data !== null) {
                const updatedData = data.map((recipe) => {
                  if (payload.new.id === recipe.id) return payload.new 
                  else return recipe
                })
                console.log('New data ...')
                console.log(updatedData)
                console.log('-------------------------------')
                setDatabaseData(updatedData) 
              }
             
            }
          )
          .subscribe()

          supabase
            .channel('schema-db-changes')
            .on(
              'postgres_changes',
              {
                event: 'INSERT',
                schema: 'public',
              },
              async (payload) => {
                console.log('Hello from Postgres channel!')
              console.log(payload)
              console.log('Updating data context!')
              if (data !== null) {
                const updatedData = data.map((recipe) => {
                  if (payload.new.id === recipe.id) return payload.new 
                  else return recipe
                })
                console.log('New data ...')
                console.log(updatedData)
                console.log('-------------------------------')
                setDatabaseData(updatedData) 
                const favourites = await filterFavourites(user, data, 'favourites')
                console.log('Favourites from data context')
                console.log(favourites)
                console.log('--------------------')
                setFavourites(favourites)
                const renderedData = await filterFavourites(user, data, 'filtered')
                console.log('Data to render ...')
                console.log(renderedData)
                console.log('--------------------')
                setFiltered(renderedData)
              }

              }
            )
            .subscribe()
    })()
  }, []);

  const context = {
    data: databaseData, //raw
    filtered: filtered,
    desktop: desktop,
    dummyData: dummyData,
    loading: loading,
    dev: devEnvironment,
    favourites: favourites
  };

  return <DataContext.Provider value={context}>{!loading && children}</DataContext.Provider>;
}
