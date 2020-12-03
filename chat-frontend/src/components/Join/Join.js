import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import queryString from 'query-string';

import './Join.css';

const Join = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    useEffect( () => {

        const {name} = queryString.parse(location.search);
        setName(name);

    })

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input className="joinInput" value={name} type="text" ></input></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}></input></div>
                <Link onClick={event =>(!name || !room) ? event.preventDefault : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Join</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;