import React from "react";

const Register = () => {
    return (
        <div className="form-container glass">
        <div className="form-wrapper">
            <span className="logo">Star Rail Messenger</span>
            <span className="title">Register</span>
            <form>
                <input type="text" placeholder="Display Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="file" placeholder="Avatar"/>
                <button>Sign Up</button>
            </form>
            <p>Already have an account? Login</p>
        </div>
    </div>
    )
};

export default Register;