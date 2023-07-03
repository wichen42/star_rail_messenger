import React, { useState } from 'react'

const LoginForm = () => {
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
            <button name='demo-login' onClick={handleSubmit}>Login as Demo User</button>
            <div>
                <span>Don't have an account?</span>
                <span id='form-register'>Register</span>
            </div>
        </form>
    );
};

export default LoginForm