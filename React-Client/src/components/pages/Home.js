import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import '../../App.css';
import GameCards from '../GameCards/GameCards';
import Welcome from '../Welcome/Welcome';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';

const Home = ({location}) => {
  const [name, setName] = useState('');

  useEffect( () => {
    const {name} = queryString.parse(location.search);
    setName(name);
  });
  return (
    <>
      <Navbar name={name}/>
      <Welcome name={name}/>
      <GameCards />
      <Footer />
    </>
  );
}

export default Home;