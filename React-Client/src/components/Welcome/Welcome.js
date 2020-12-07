import React from 'react';
import '../../App.css';
import { Button } from '../Buttons/Buttons';
import './Welcome.css';

function Welcome({name}) {
  return (
    <div className='welcome-container'>
      <h1>WELCOME {name}</h1>
      <p>Check out our new games!!</p>
      <div className='welcome-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link={`/?name=${name}#Popular`}
        >
          NEW ARRIVALS
        </Button>
      </div>
    </div>
  );
}

export default Welcome;