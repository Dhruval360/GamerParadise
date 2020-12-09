import React, {useContext} from 'react';
import UserContext from '../../context/UserContext';
import '../../App.css';
import { Button } from '../Buttons/Buttons';
import './Welcome.css';

function Welcome() {
  const {userData} = useContext(UserContext);
  return (
    <div className='welcome-container' id="home">
      <h1>WELCOME {userData.user ? userData.user.name : "Gamer"}</h1>
      <p>Check out our new games!!</p>
      <div className='welcome-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link='/#Popular'
        >
          NEW ARRIVALS
        </Button>
      </div>
    </div>
  );
}

export default Welcome;