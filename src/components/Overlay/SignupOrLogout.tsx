import { Link } from 'react-router-dom';

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
            <i className='far fa-user-plus w-8'></i>
          </span>
        </Link>
      </>
    );
  }
};

export default SignupOrLogout