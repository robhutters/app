import { createContext, useState, useContext, useEffect } from 'react';
import userOnDesktop from '../helpers/userOnDesktop';
import DataConTextType from '../interfaces/DataContextType';
import { supabase } from '../supabaseClient';
import recipesTestObject from '../helpers/recipesTestObject';

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


  useEffect(() => {
    // Check active sessions and sets the user
    (async function () {
      const view = await userOnDesktop()
      if (view === true) setDesktop(true)
      else setDesktop(false)

      const {data, error} = await supabase.from('recipes').select()
      if (!error) setDatabaseData(data) 
      else alert('Could not load data from database. Check Data Context component.')

      setDummyData(recipesTestObject)
      setDevEnvironment(false)
      setLoading(false)

        // Listen for changes on state
        const channel = supabase
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
    })()
  }, []);

  const context = {
    data: databaseData,
    desktop: desktop,
    dummyData: dummyData,
    loading: loading,
    dev: devEnvironment
  };

  return <DataContext.Provider value={context}>{!loading && children}</DataContext.Provider>;
}
