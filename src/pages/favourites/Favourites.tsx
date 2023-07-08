import { useAuth } from "../../context/Auth";
import recipesTestObject from "../../helpers/recipesTestObject";
import Layout from "../Layout";

export function Favourites () {
  const {menu, user} = useAuth()

  const favourites = recipesTestObject

  if (user) {
    return (
      <Layout menu={menu}>
        <div>
          <h1>Favorieten</h1>
         
          <ul>
          {favourites.map((recept, index) => {
            return <li key={index}>{recept.recipename}</li>
          })}
          </ul>
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