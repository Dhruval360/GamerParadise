import React, { useState, useEffect} from 'react';
import axios from 'axios';

const LeaderBoard = () => {
    const [users,setUsers] = useState([]);
    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:5000/users/leaderboard')
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);


    let usersList = users.map(user => <li key={user.id}>{user.name}</li> )
    return(
         <ul>{usersList}</ul>
    )

}

export default LeaderBoard;