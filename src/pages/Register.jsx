import React from "react";
import addAvatar from "../assets/addAvatar.png";

const Register = () => {
    return (
        <div className="form-container">
        <div className="form-wrapper">
            <div className="form-header">
                <span className="logo">Star Rail Messenger</span>
                <span className="title">Register</span>
            </div>
            <form>
                <input type="text" placeholder="Display Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="file" id="file" style={{display:"none"}} placeholder="Avatar"/>
                <label htmlFor="file">
                    <img src={addAvatar} alt="" />
                    <span>Add an Avatar</span>
                </label>
                <button>Sign Up</button>
                <p>Already have an account? Login</p>
            </form>
        </div>
    </div>
    )
};

export default Register;