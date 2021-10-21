import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <main className='mt-10 p-8 flex flex-col'>
      <h1>Wat doe je nou weer sukkel ...</h1>
      <p>Ik weet niet wat je probeert te doen maar ik zou maar gauw terug gaan.</p>
      <section className='mt-5'>
        <Link to='/'>
          <button>voorpagina</button>
        </Link>
      </section>
    </main>
  );
};

export default NoMatch;
