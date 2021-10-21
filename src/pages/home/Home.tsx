import { useContext } from 'react';
import Layout from '../Layout';
import './home.css';
import Auth from '../../Auth';
import { AuthContext } from '../../context/Auth';
import Account from '../account/Account';

function Home() {
  const menu = useContext(AuthContext);

  return (
    <Layout context={menu} className='container' style={{ padding: '50px 0 100px 0' }}>
      <p>Layout ...</p>
    </Layout>
  );
}

export default Home;
