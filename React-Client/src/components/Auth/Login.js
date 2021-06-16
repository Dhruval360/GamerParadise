import React, {useState, useContext} from 'react'
import UserContext from '../../context/UserContext';
import {useHistory, Link} from 'react-router-dom';
import './Auth.css';
import Axios from 'axios';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();
    const Submit = async (e) => {
        e.preventDefault(); // To prevent the default action of reloading the page

        try {
            const loginUser = {email, password};        
            const loginRes = await Axios.post("http://localhost:5000/users/login", loginUser);
            setUserData({token: loginRes.data.token, user: loginRes.data.user});
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push('/'); // To take the user to the home page   
        } catch (error) {
            error.response.data.message && setErrors(error.response.data.message);
        }
    }

    return (
        <>
        <div className='form-container'>
            
            <div className='form-content-left'>
                <img className='form-img' src='Images/img-2.svg' alt='spaceship' />
            </div>
            <div className='form-content-right'>
                <form onSubmit={Submit} className='Auth' >
                    <br />
                    <h1 className="Auth">
                    Login
                    </h1>
                    {errors && <p className="error">{errors}</p>}
                    <div className='form-inputs'>
                        <label className='form-label'>Email</label>
                        <input
                            required={true}
                            className='form-input'
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className='form-inputs'>
                        <label className='form-label'>Password</label>
                        <input
                            required={true}
                            className='form-input'
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    
                    </div>
                    
                    <input className='form-input-btn' type='submit' value="LOG IN"></input>
                    <span className='form-input-login'>
                        <br/><br/>Don't have an account? Register <Link to='/register'>here</Link> 
                    </span>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login
