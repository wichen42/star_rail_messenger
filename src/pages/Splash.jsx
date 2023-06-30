import { useRef, useState } from "react";
import hsr_bg from "../assets/hsr_bg.mp4";

const Splash = () => {
    const modal = useRef(null);

    const handleOpen = () => {
        modal.current.showModal();
    };

    const handleClose = () => {
        modal.current.close();
    }

    return (
    <div className='splash-container'>
        <div className='dialog-overlay' onClick={handleClose}>
            <dialog ref={modal}>
                <div className="dialog-header">
                    <span>Login</span>
                    <span>Register</span>
                </div>
            </dialog>
        </div>
        <video src={hsr_bg} ></video>
        <div className="splash-content">
            <div className="splash-overlay">
                <div className="splash-header">
                    <h1>Star Rail Messenger</h1>
                    <div>
                        <p>About</p>
                        <p>LinkedIn</p>
                        <p>GitHub</p>
                        <p>Contact</p>
                    </div>
                </div>
                <div className="splash-button">
                    <div className="splash-login" onClick={handleOpen}>Login</div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Splash