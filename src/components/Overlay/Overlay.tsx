import { Link } from 'react-router-dom';
import SignupOrLogout from './SignupOrLogout';

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

      {/* conditionally render parts of the menu */}
      <SignupOrLogout context={context} hidden={isHidden} />
    </nav>
  );
};
export default Overlay;

