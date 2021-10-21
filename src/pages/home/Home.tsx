import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import Layout from '../Layout';

function Home() {
  const menu = useContext(AuthContext);

  return <Layout context={menu}></Layout>;
}

export default Home;
