import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from './Menu.module.css';
import { useLocation } from 'react-router-dom';
import Burger from './Burger';
import Overlay from './Overlay';

function Menu({ context }: any) {
  let location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    const menu = {};

    const target = document.getElementById('home');
    if (target === null) return;
    target.classList.add('border-primary');
    target.classList.remove('border-body-200');

    for (let key in menu) {
      if (key === path) {
        const home = document.getElementById('home');
        if (home === null) return;
        home.classList.remove('border-primary');
        home.classList.add('border-body-200');

        const target = document.getElementById(path);
        if (target === null) return;
        target.classList.remove('border-body-200');
        target.classList.add('border-primary');
      } else {
      }
    }
  }, [location]);

  return (
    <>
      <header className='md:col-span-1 md:flex md:justify-end '>
        <nav className='text-right relative'>
          <div className='fixed overflow-hidden z-40 md:relative w-full py-5 flex flex-row-reverse justify-between items-center  m-0 shadow-lg md:shadow-none md:bg-dark-400 bg-dark-200'>
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
            <li className='px-4 border-r-2 border-body-200' id='home'>
              <Link to={`/`}>
                <span className='px-2'>Home</span>
                <span>
                  <i className='fal fa-home w-8'></i>
                </span>
              </Link>
            </li>
            <li className='px-4 border-r-2 border-body-200' id='home'>
              <Link to={`/account`}>
                <span className='px-2'>Account</span>
                <span>
                  <i className='fal fa-user w-8'></i>
                </span>
              </Link>
            </li>
            <li className='px-4 border-r-2 border-body-200' id='home'>
              <Link to={`/dashboard`}>
                <span className='px-2'>Dashboard</span>
                <span>
                  <i className='fal fa-desktop w-8'></i>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
export default Menu;
