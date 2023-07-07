import Menu from '../components/Menu';
import News from '../components/news/News';

const Layout = ({ children, context }: any) => {
  const OverlayVisible = context.open ? 'hidden' : 'md:px-6 py-6';

  return (
    <div className='md:grid md:grid-cols-4'>
      <Menu context={context} />
     
      <section className='col-span-3'> 
        <main className={`${OverlayVisible} flex flex-col min-h-screen w-full` }>
          <News />
          <section className='md:mt-0 px-4 flex-grow'>
            {children}
          </section>
        </main>
        <footer className="flex flex-row justify-end py-6">
          <p className='px-6'><strong>Build:</strong> alpha-1.0.0.</p>
        </footer>
      </section>
    </div>
  );
};

export default Layout;
