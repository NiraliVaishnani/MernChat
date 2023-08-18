import React, { useState } from 'react'
import "../../style/Register.css"
import axios from 'axios';
const Register = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)
        try {
            const response = await axios.post(`http://localhost:5000/account/register`, {
                email: email,
                password: password,
            })
            const data = response.data;
            console.log(data)
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage("Password must contain at least one uppercase letter and one digit"); // Set specific error message for incorrect password
            } else if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                console.error("An error occurred:", error);
            }
        }

    }
    return (

        <div className="register-container">

            <form className="register-form">
                <h1>Registration</h1>
                <input type="text" value={email} className="register-input" onChange={e => setemail(e.target.value)} placeholder="username"></input>
                <input type="password" value={password} className="register-input" onChange={e => setpassword(e.target.value)} placeholder="password"></input>
                <button type="submit" className="register-button" onClick={(handleSubmit)}>Register</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    )
}

export default Register
