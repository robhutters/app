import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from './Menu.module.css';
import { useLocation } from 'react-router-dom';
import Burger from './Burger';
import Overlay from './Overlay';
import MenuSignUpOrLogout from './MenuSignupOrLogout';
import News from './news/News';

function Menu({ context }: any) {
 

  return (
    <>
      <News />
      <header className='md:col-span-1 md:flex md:justify-end '>
        <nav className='text-right relative'>
          <div className='sticky overflow-hidden z-40 md:relative w-full py-5 flex flex-row-reverse justify-between items-center  m-0 shadow-lg md:shadow-none '>
            <div  >
              <Link to={`/`}>
                <span className={styled.title}>
                  <h1 className='text-4xl sm:text-6xl font-semibold pr-4'>{import.meta.env.VITE_NAME_OF_COMPANY} </h1>
                </span>{' '}
              </Link>
            </div>
            <div className='cursor-pointer px-8 md:hidden' id='burger'>
              <Burger context={context} />
              <Overlay context={context} />
            </div>
          </div>
          <ul className='hidden md:block' id='menu'>
            <li className='px-4 border-r-2 border-body-200 ' id='home'>
              <Link to={`/`}>
              
                <span className='px-2 '>Home</span>
                <span>
                  <i className='fal fa-home w-8 '></i>
                </span>
             
               
              </Link>
            </li>
            <MenuSignUpOrLogout context={context} />
          </ul>
        </nav>
      </header>
    </>
  );
}
export default Menu;
