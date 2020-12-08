import React, { useState, useEffect } from 'react';
import { Button } from '../Buttons/Buttons';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({name}) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) setButton(false);
        else setButton(true);
    };

    useEffect(() => showButton(), []);
    window.addEventListener('resize', showButton);

    return (
        <>
           <nav className="navbar">
               <div className="navbar-container">
                    <Link to={`/?name=${name}`} className="navbar-logo" onClick={closeMobileMenu}>
                       GamerParadise <i class="fas fa-gamepad"></i>
                    </Link>
                   <div className="menu-icon" onClick={handleClick}>
                       <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                   </div>
                   <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                       <li className='nav-item'>
                           <Link to={`/chat?name=${name}&room=chatroom`} className='nav-links' onClick={closeMobileMenu}>
                               Chat
                           </Link>
                       </li>
                       <li className='nav-item'>
                           <Link to="/leaderboard" className='nav-links' onClick={closeMobileMenu}>
                               Leaderboards
                           </Link>
                       </li>
                       <li className='nav-item'>
                           <a href={`/?name=${name}#Popular`} className='nav-links' onClick={closeMobileMenu}>
                               Games
                           </a>
                       </li>
                       <li className='nav-item'>
                           <a href="http://localhost:5000/users/logout" className='nav-links-mobile' onClick={closeMobileMenu}>
                               Sign Out
                           </a>
                       </li>
                   </ul>
                   {button && <Button buttonStyle='btn--outline' link="http://localhost:5000/users/logout">SIGN OUT</Button>}
               </div>
           </nav>
        </>
    )
}

export default NavBar;