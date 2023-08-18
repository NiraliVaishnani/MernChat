import React, { useState } from 'react'
import "../../style/Register.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [attempts, setattempts] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)
        try {
            const response = await axios.post(`http://localhost:5000/account/login`, {
                email: email,
                password: password,
            })
            const data = response.data;
            console.log(data.token)
            if (data.token) {
                localStorage.setItem('logintoken', data.token);
                console.log("Login succesfull")
                navigate('/chat')
            }
            else {
                console.log(data.attempts)
            }

        }
        catch (error) {

            //console.log(data);
            if (error.response && error.response.status === 401) {
                console.log(error.response.data.attempts)
                const data = error.response.data;
                setattempts(data.attempts)

                setErrorMessage("Incorrect password");
                if (data.attempts == 5) {

                    setErrorMessage("Too many attempts try after 30 seconds");
                    setIsButtonDisabled(true);
                    setTimeout(() => {
                        setIsButtonDisabled(false);
                        setErrorMessage('');
                    }, 30000);
                }

                if (data.attempts == 8) {
                    setErrorMessage("Too many attempts try after 5 minutes");
                    setIsButtonDisabled(true);
                    setTimeout(() => {
                        setIsButtonDisabled(false);
                        setErrorMessage('');
                    }, 5 * 60 * 1000);
                }
            } else if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                console.error("An error occurred:", error);
            }
        }


    }
    // const isButtonDisabled = attempts >= 5; // Determine whether the button should be disabled
    // if (attempts >= 5) {

    // }
    return (
        <div className="register-container">

            <form className="register-form">
                <h1>Login</h1>
                <input type="text" value={email} className="register-input" onChange={e => setemail(e.target.value)} placeholder="username"></input>
                <input type="password" value={password} className="register-input" onChange={e => setpassword(e.target.value)} placeholder="password"></input>
                <button type="submit" className="register-button" onClick={(handleSubmit)} disabled={isButtonDisabled} >Login</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    )
}

export default Login
