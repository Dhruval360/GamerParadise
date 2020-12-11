import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../Auth/AuthOptions'
import './NavBar.css';
import UserContext from '../../context/UserContext';

function NavBar({name}) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const {userData} = useContext(UserContext);
    
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
                    <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                       GamerParadise <i className="fas fa-gamepad"></i>
                    </Link>
                   <div className="menu-icon" onClick={handleClick}>
                       <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                   </div>
                   <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                       
                        {userData.user && (
                       <li className='nav-item'>
                           <Link to={`/chat?name=${userData.user.name}&room=chatroom`} className='nav-links' onClick={closeMobileMenu}>
                               Chat
                           </Link>
                       </li>
                       )}
                       {userData.user && (
                       <li className='nav-item'>
                           <Link to="/leaderboard" className='nav-links' onClick={closeMobileMenu}>
                               Leaderboards
                           </Link>
                       </li>
                       )}
                       {userData.user && (
                       <li className='nav-item'>
                           <a href='#Popular' className='nav-links' onClick={closeMobileMenu}>
                               Games
                           </a>
                       </li>
                       )}
                       <AuthOptions />
                   </ul>
               </div>
           </nav>
        </>
    )
}

export default NavBar;