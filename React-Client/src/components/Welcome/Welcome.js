import React from 'react';
import '../../App.css';
import { Button } from '../Buttons/Buttons';
import './Welcome.css';

function Welcome() {
  return (
    <div className='welcome-container'>
      <h1>WELCOME GAMER</h1>
      <p>Lets get started</p>
      <div className='welcome-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default Welcome;