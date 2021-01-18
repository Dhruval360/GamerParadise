import React, {useState, useContext} from 'react'
import UserContext from '../../context/UserContext';
import {useHistory, Link} from 'react-router-dom';
import './Auth.css';
import Axios from 'axios';

function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();
    const [errors, setErrors] = useState();
    
    const Submit = async (e) => {
        e.preventDefault(); // To prevent the default action of reloading the page

        try {
            const newUser = {name, email, password, password2};
            await Axios.post("http://localhost:5000/users/register", newUser);
            
            const loginRes = await Axios.post("http://localhost:5000/users/login", {email, password});
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
                Welcome aboard!!
                </h1>
                {errors && <p className="error">{errors}</p>}
                <div className='form-inputs'>
                <label className='form-label'>Username</label>
                <input
                    required={true}
                    className='form-input'
                    type='text'
                    name='username'
                    placeholder='Enter your username'
                    //value={values.username}
                    onChange={(e) => setName(e.target.value)}
                />
                
                </div>
                <div className='form-inputs'>
                <label className='form-label'>Email</label>
                <input
                    required={true}
                    className='form-input'
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    //value={values.email}
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
                    //value={values.password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                </div>
                <div className='form-inputs'>
                <label className='form-label'>Confirm Password</label>
                <input
                    required={true}
                    className='form-input'
                    type='password'
                    name='password2'
                    placeholder='Confirm your password'
                    //value={values.password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                
                </div>
                <input className='form-input-btn' type='submit' value="SIGN UP">
                </input>
                <span className='form-input-login'>
                <br/><br/>Already have an account? Login <Link to='/login'>here</Link> 
                </span>
            </form>
            </div>
        </div>
        </>
      );
    };

export default Register
