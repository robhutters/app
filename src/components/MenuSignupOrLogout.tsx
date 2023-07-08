import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";

const MenuSignUpOrLogout = () => {
  const { user } = useAuth()
 
  if (user) {
    return(
     <React.Fragment>
        <li className='px-4 border-r-2 border-body-200 ' id='home'>
              <Link to={`/account`}>
                <span className='px-2'>Account</span>
                <span>
                  <i className='fal fa-user w-8 '></i>
                </span>
              </Link>
            </li>
            <li className='px-4 border-r-2 border-body-200 ' id='home'>
              <Link to={`/favourites`}>
                <span className='px-2  '>Favorieten</span>
                <span>
                  <i className='fal fa-desktop w-8 '></i>
                </span>
              </Link>
            </li>
            <li className='px-4 border-r-2 border-body-200 ' id='home'>
              <Link to={`/dashboard`}>
                <span className='px-2  '>Dashboard</span>
                <span>
                  <i className='fal fa-desktop w-8 '></i>
                </span>
              </Link>
            </li>
           
     </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
         <li className='px-4 border-r-2 border-body-200 ' id='login'>
              <Link to={`/login`}>
                <span className='px-2 '>Login</span>
                <span>
                  <i className='fal fa-sign-in-alt w-8 '></i>
                </span>
              </Link>
             
            </li>
            <li className='px-4 border-r-2 border-body-200 ' id='login'>
              <Link to={`/signup`}>
                <span className='px-2 '>Aanmelden</span>
                <span>
                  <i className='fal fa-sign-in-alt w-8 '></i>
                </span>
              </Link>
             
            </li>
       
      </React.Fragment>
    )
  }
}

export default MenuSignUpOrLogout;