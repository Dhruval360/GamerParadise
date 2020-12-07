import React from 'react';
import './GameCards.css';
import GameItem from './GameItem';

function Games() {
  return (
    <div className='games'>
      <h1>Check out these EPIC Games</h1>
      <div className='games__container'>
        <div className='games__wrapper'>
          <ul className='games__items'>
            <GameItem
              src='Images/AirHockey.jpeg'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Adventure'
              path='/services'
            />
            <GameItem
              src='Images/AirHockey.jpeg'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/services'
            />
          </ul>
          <ul className='games__items'>
            <GameItem
              src='Images/AirHockey.jpeg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/services'
            />
            <GameItem
              src='Images/AirHockey.jpeg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Adventure'
              path='/products'
            />
            <GameItem
              src='Images/AirHockey.jpeg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Games;