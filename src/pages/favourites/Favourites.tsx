import DesktopLayout from "../../components/Desktop/DesktopLayout";
import { useAuth } from "../../context/Auth";
import { useData } from "../../context/Data";
import recipesFavouritesTestObject from "../../helpers/recipesFavouritesTestObject";
import Layout from "../Layout";

export function Favourites () {
  const {menu, user} = useAuth()
  const {dummyData} = useData()
  const favourites = dummyData.filter((item) => item.favourite === true)

  if (user) {
    return (
      <Layout menu={menu}>
        <div>
          <h1>Favorieten</h1>
         
        

          <DesktopLayout dataset={favourites} />
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