import React, {useContext} from 'react';
import './GameCards.css';
import GameItem from './GameItem';
import UserContext from '../../context/UserContext';

function Games() {
  const {userData} = useContext(UserContext);
  return (
    <div className='games' id="Popular">
      <div className='games__container'>
        Most Played
        <div className='games__wrapper'>
          <ul className='games__items'>
            <GameItem
              src='Images/AirHockey.jpeg'
              text='A fierce duel of Air Hockey. May the best contender win!!'
              label='Multiplayer'
              path={`http://localhost:2000/?name=${userData.user ? userData.user.name : "Gamer"}`}
            />
            <GameItem
              src='Images/AirHockey.jpeg'
              text='Game2'
              label='Single Player'
              path='/services'
            />
          </ul>
        </div>
        </div>
        <div className='games__container'>
        New Games
        <div className='games__wrapper'>
          <ul className='games__items'>
            <GameItem
              src='Images/AirHockey.jpeg'
              text='Generic game description to be place here'
              label='Multiplayer'
              path='/services'
            />
            <GameItem
              src='Images/AirHockey.jpeg'
              text='Game 2'
              label='Single Player'
              path='/products'
            />
            <GameItem
              src='Images/AirHockey.jpeg'
              text='Game 3'
              label='Single Player'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Games;