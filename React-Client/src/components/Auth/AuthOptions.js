import React, {useContext} from 'react'
import { Button } from '../Buttons/Buttons';
import UserContext from '../../context/UserContext';

function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext);
    const logout = () => {
        setUserData({
            token : undefined,
            user : undefined
        });
        localStorage.setItem("auth-token", "");
    }
    return (
        <>
            {
                userData.user ? 
                (
                    <li className='nav-buttons'>
                        <Button onClick={logout} buttonStyle='btn--outline'>SIGN OUT</Button>
                    </li>
                ) :
                (
                <></>
                )
            }
            
        </>
    )
}

export default AuthOptions
