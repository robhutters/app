import { Link } from 'react-router-dom';

const Overlay = ({ context }: any) => {
  const { open, setOpen } = context;

  let className = 'md:hidden overflow-y-auto text-base h-full w-full fixed flex flex-col text-left p-2 top-0 left-0 bottom-0 right-0 bg-body-200  z-10 transition transform duration-300 ease-in-out';

  if (!open) {
    className += 'md:hidden overflow-y-auto text-base h-full w-full fixed flex flex-col  h-screen text-left p-2 top-0 left-0 bottom-0 right-0 bg-body-200 w-full z-10 transition transform duration-300 ease-in-out -translate-x-full';
  }

  function handleClick() {
    if (open) {
      setOpen(!open);
    }
  }

  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <nav className={className} aria-hidden={!isHidden}>
      <Link to={`/`} tabIndex={tabIndex} onClick={handleClick} className='px-4 uppercase mt-20 pt-8 pb-4 font-bold tracking-wider no-underline transition-colors duration-300 ease-linear border-b-2 border-white'>
        <span className='px-2'>Home</span>
        <span aria-hidden='true'>
          <i className='fal fa-home w-8'></i>
        </span>
      </Link>

      <SignupOrLogout context={context} hidden={isHidden} />
    </nav>
  );
};
export default Overlay;

const SignupOrLogout = ({ context }: any, props: any) => {
  const { user, open, setOpen } = context;
  const isHidden = props.hidden;

  function handleClick() {
    if (open) {
      setOpen(!open);
    }
  }

  const tabIndex = isHidden ? 0 : -1;


  if (user) {
    return (
      <>
        <Link to={'/account'} tabIndex={tabIndex} onClick={handleClick} className='px-4 uppercase pt-8 pb-4 font-bold tracking-wider no-underline  transition-colors duration-300 ease-linear border-b-2 border-white'>
          <span className='px-2'>account</span>
          <span aria-hidden='true'>
            <i className='far fa-user w-8'></i>
          </span>
        </Link>
        <Link to={'/dashboard'} tabIndex={tabIndex} onClick={handleClick} className='px-4 uppercase pt-8 pb-4 font-bold tracking-wider no-underline  transition-colors duration-300 ease-linear border-b-2 border-white'>
          <span className='px-2'>Dashboard</span>
          <span aria-hidden='true'>
            <i className='far fa-desktop w-8'></i>
          </span>
        </Link>
        <Link to={'/logout'} tabIndex={tabIndex} onClick={handleClick} className='px-4 uppercase pt-8 pb-4 font-bold tracking-wider no-underline  transition-colors duration-300 ease-linear border-b-2 border-white'>
          <span className='px-2'>log uit</span>
          <span aria-hidden='true'>
            <i className='far fa-sign-out-alt w-8'></i>
          </span>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link to={'/login'} tabIndex={tabIndex} onClick={handleClick} className='px-4 uppercase pt-8 pb-4 font-bold tracking-wider no-underline  transition-colors duration-300 ease-linear border-b-2 border-white'>
          <span className='px-2'>Login</span>
          <span aria-hidden='true'>
            <i className='far fa-sign-in-alt w-8'></i>
          </span>
        </Link>
        <Link to={'/signup'} tabIndex={tabIndex} onClick={handleClick} className='px-4 uppercase pt-8 pb-4 font-bold tracking-wider no-underline  transition-colors duration-300 ease-linear border-b-2 border-white'>
          <span className='px-2'>signup</span>
          <span aria-hidden='true'>
            <i className='far fa-user w-8'></i>
          </span>
        </Link>
      </>
    );
  }
};
