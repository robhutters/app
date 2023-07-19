import { useRef, useEffect } from 'react';
import styles from './Burger.module.css';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    open?: boolean;
  }
}

type Context = {
  menu: any;
};

const Burger = ({ menu, ...props }: Context) => {
  const { open, setOpen } = menu;
  const completedClass = open ? styles.isOpen : '';

  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick); // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const handleClick = (e: any) => {
    if (node.current !== null) {
      if (node.current.contains(e.target)) {
        // inside click
        setOpen(!open);
        return;
      } // outside click
      setOpen(false);
    }
  };

  const isExpanded = open ? true : false;

  return (
    <div ref={node} open={open} aria-label='Toggle menu' aria-expanded={isExpanded} {...props}>
      <span className={`${styles.burgerLines} ${completedClass}`} />
      <span className={`${styles.burgerLines} ${completedClass}`} />
      <span className={`${styles.burgerLines} ${completedClass}`} />
    </div>
  );
};

export default Burger;
