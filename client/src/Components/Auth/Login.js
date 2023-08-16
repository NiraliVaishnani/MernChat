import React, { useState } from 'react'
import "../../style/Register.css"
import axios from 'axios';
const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)
        const response = await axios.post(`http://localhost:5000/account/login`, {
            email: email,
            password: password,
        })
        const data = response.data;
        console.log(data.token)
        localStorage.setItem('logintoken', data.token);
        console.log("Login succesfull")
    }


    return (
        <div className="register-container">

            <form className="register-form">
                <h1>Login</h1>
                <input type="text" value={email} className="register-input" onChange={e => setemail(e.target.value)} placeholder="username"></input>
                <input type="password" value={password} className="register-input" onChange={e => setpassword(e.target.value)} placeholder="password"></input>
                <button type="submit" className="register-button" onClick={(handleSubmit)}>Login</button>
            </form>
        </div>
    )
}

export default Login
