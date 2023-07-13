import Menu from '../components/Menu';
import News from '../components/News/News';

const Layout = ({ children, menu }: any) => {
  
  const OverlayVisible = menu.open ? 'hidden' : 'md:px-6 pt-3';

  return (
    /* Grid layout is for Desktop. */
    <div className='md:grid md:grid-cols-4 flex flex-col min-h-screen'>     
      <Menu menu={menu} />
      
      <section className='md:col-span-3 flex flex-col flex-grow '>
        <section className='flex flex-col flex-grow w-full' > 
        <News />
          <main className={`${OverlayVisible} flex flex-col flex-grow` }>
            <section className='md:mt-0 px-4 flex flex-col flex-grow'>
              {children}
            </section>
          </main>
        </section>
          <footer className="flex flex-row justify-end py-6">
            <p className='px-6'><strong>Build:</strong> alpha-1.0.0.</p>
          </footer>
      </section>
    </div>
  );
};

export default Layout;
