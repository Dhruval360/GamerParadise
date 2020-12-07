import React from 'react';
import '../../App.css';
import GameCards from '../GameCards/GameCards';
import Welcome from '../Welcome/Welcome';
import Footer from '../Footer/Footer';

function Home() {
  return (
    <>
      <Welcome />
      <GameCards />
      <Footer />
    </>
  );
}

export default Home;