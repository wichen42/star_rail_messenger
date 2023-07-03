import React, { useState } from 'react'

const LoginForm = ({toggleForm}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
    };

    return (
        <form>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button name='login'onClick={handleSubmit}>Login</button>
            <div>
                <p>Don't have an account? <span id='form-register' onClick={toggleForm}>Register</span></p>
                <span>or</span>
                <span id='demo-login'>Login as a Demo User</span>
            </div>
        </form>
    );
};

export default LoginForm