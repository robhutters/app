import { useLocation } from "react-router-dom";
import DesktopLayout from "../../components/Desktop/DesktopLayout";
import { useAuth } from "../../context/Auth";
import { useData } from "../../context/Data";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import filterFavourites from "../../helpers/filterFavourites";

export function Favourites () {
  const {menu, user} = useAuth()
  const recipes = useData()
  const [dummyData, setDummyData] = useState<any[]>([])

  useEffect(() => {
    
    (async function() {
      if (recipes.dev) {
        const favouritesDummy = recipes.dummyData.filter((item) => item.favourite === true)
        setDummyData(favouritesDummy)
      } 
    })()
  }, [])
  

  if (user) {
    return (
      <Layout menu={menu}>
        <div>
          <h1>Favorieten</h1>
          <DesktopLayout dataset={recipes.dev ? dummyData : recipes.favourites} />
          <p>{recipes.favourites.length == 0  ? 'Geen favoriete gerechten gevonden.': ' '}</p>
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div>
          <p>Je moet inloggen om je favorieten te kunnen zien.</p>
        </div>
      </Layout>
    )
  }
}