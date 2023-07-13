import { useLocation } from "react-router-dom";
import DesktopLayout from "../../components/Desktop/DesktopLayout";
import { useAuth } from "../../context/Auth";
import { useData } from "../../context/Data";
import Layout from "../Layout";

export function Favourites () {
  const {menu, user} = useAuth()
  const {dummyData, dev, data} = useData()

  const favouritesDummy = dummyData.filter((item) => item.favourite === true)
  const favourites = data.filter((item => item.favourite === true))
  

  if (user) {
    return (
      <Layout menu={menu}>
        <div>
          <h1>Favorieten</h1>
          <DesktopLayout dataset={dev ? favouritesDummy : favourites} />
          <p>{favourites.length === 0 || favouritesDummy.length === 0 ? 'Geen favoriete gerechten gevonden.': ' '}</p>
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