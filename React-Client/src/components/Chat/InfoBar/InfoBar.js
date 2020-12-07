import React from 'react';
import { Link } from 'react-router-dom';

import './InfoBar.css';

const InfoBar = ({room, name}) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src='./icons/onlineIcon.png' alt="online" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <Link to={`/?name=${name}`}>
                <i class="fa fa-window-close-o fa-3x" aria-hidden="true"></i>
            </Link>
        </div>
    </div>

);


export default InfoBar;