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
              path={`http://localhost:2000/AirHockey?name=${userData.user ? userData.user.name : "Gamer"}`}
            />
            <GameItem
              src='Images/WordBeater.png'
              text='Put your typing skills to the test with this game aptly called WordBeater'
              label='Single Player'
              path={`http://localhost:2000/WordBeater?name=${userData.user ? userData.user.name : "Gamer"}`}
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
              text='A fierce duel of Air Hockey. May the best contender win!!'
              label='Multiplayer'
              path={`http://localhost:2000/AirHockey?name=${userData.user ? userData.user.name : "Gamer"}`}
            />
            <GameItem
              src='Images/WordBeater.png'
              text='Put your typing skills to the test with this game aptly called WordBeater'
              label='Single Player'
              path={`http://localhost:2000/WordBeater?name=${userData.user ? userData.user.name : "Gamer"}`}
            />
            <GameItem
              src='Images/AirHockey.jpeg'
              text='Test your mouse aiming skills with this awesome game'
              label='Single Player'
              path={`http://localhost:2000/Clicker2D?name=${userData.user ? userData.user.name : "Gamer"}`}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Games;