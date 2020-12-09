import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import '../../App.css';
import GameCards from '../GameCards/GameCards';
import Welcome from '../Welcome/Welcome';
import Footer from '../Footer/Footer';
import UserContext from '../../context/UserContext';


const Home = () => {
  const {userData} = useContext(UserContext);
  const history = useHistory();

  useEffect( () => {
    if(!userData.user) history.push('/login');
  }, [userData.user, history]);

  return (
    <>
      <Welcome />
      <GameCards />
      <Footer />
    </>
  );
}

export default Home;