import { useState } from "react"
import { trackSlideView } from "../../helpers/trackSlideView"
import { HashLink } from 'react-router-hash-link'
import RecipeLayout from "../Recipes/RecipeLayout"

export default function DesktopLayout ( {dataset} : {dataset: any}) {

  const [slideNumber, setSlideNumber] = useState<number>(2)

  return (
    <div >
      
      <div className='py-4'>
                <span onClick={() => trackSlideView(slideNumber, dataset, "next", setSlideNumber)} >
              <HashLink id="testButton" smooth to={`/#${slideNumber}`} className="btn btn-secondary"><p className='text-2xl'>Volgende</p></HashLink>
            </span>
            </div>

            <div className="carousel w-full">
            {dataset !== null ? dataset.map((recipe:any,index:any) => {
              const nextIdentifier = index + 1
              
              return (
                    <div id={nextIdentifier.toString()} key={index} className="carousel-item w-full "> 
                        <RecipeLayout recipe={recipe} />
                    </div>
                    
              )
            }) : ''}
          </div> 
      
    

    </div>
  )
}