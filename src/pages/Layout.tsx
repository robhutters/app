import Menu from '../components/Menu';

const Layout = ({ children, context }: any) => {
  const OverlayVisible = context.open ? 'hidden' : 'md:px-6 py-6 md:col-span-2';

  return (
    <section className='md:grid md:grid-cols-3 '>
      <Menu context={context} />

      <main className={`${OverlayVisible}`}>
        <section className='md:mt-0 px-4'>{children}</section>
      </main>
    </section>
  );
};

export default Layout;
