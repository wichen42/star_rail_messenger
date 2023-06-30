import { useRef } from "react";
import hsr_bg from "../assets/hsr_bg.mp4";

const Splash = () => {
    const player = useRef(null);

    return (
    <div className='login-container'>
        <video ref={player} src={hsr_bg} autoPlay muted loop></video>
        <div className="login-content">
            <h1>Welcome</h1>
            <div>
                <p>Login</p>
                <p>Register</p>
            </div>
        </div>
    </div>
    )
}

export default Splash