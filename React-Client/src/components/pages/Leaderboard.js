import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import './Leaderboard.css';

const LeaderBoard = () => {
    const [users,setUsers] = useState([]);
    const {userData} = useContext(UserContext);
    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:5000/users/leaderboard')
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    let usersList = users.map((user, index) => (
            <tr className={(userData.user && (user.name === userData.user.name)) ? "active-row" : ""}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.wins}</td>
            </tr>
      ));
    return(
        <table className="content-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Gamer Id</th>
                    <th>Wins</th>
                </tr>
            </thead>
            <tbody>
                {usersList}
            </tbody>
        </table>
    )

}

export default LeaderBoard;