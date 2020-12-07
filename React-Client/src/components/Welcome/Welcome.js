import React from 'react';
import '../../App.css';
//import { Button } from '../Buttons/Buttons';
import './Welcome.css';

function Welcome({name}) {
  return (
    <div className='welcome-container'>
      <h1>WELCOME {name}</h1>
      <p>Lets get started</p>
      
    </div>
  );
}

export default Welcome;