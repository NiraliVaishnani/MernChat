import React, { useState } from 'react'
import "../../style/Register.css"
import axios from 'axios'
const Login = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password)
        const response = await axios.get(`http://localhost:5000/account/login`)
        const data = response.data;
        console.log("Login succesfull")
    }
    return (
        <div className="register-container">

            <form className="register-form">
                <h1>Login</h1>
                <input type="text" value={username} className="register-input" onChange={e => setusername(e.target.value)} placeholder="username"></input>
                <input type="password" value={password} className="register-input" onChange={e => setpassword(e.target.value)} placeholder="password"></input>
                <button type="submit" className="register-button" onClick={(handleSubmit)}>Register</button>
            </form>
        </div>
    )
}

export default Login
