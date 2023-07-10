import { useEffect, useRef, useState } from "react";
import hsr_bg from "../assets/hsr_bg.mp4";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import mail from "../assets/contact_me_white.png";
import github_icon from "../assets/github_white.png";
import linkedin_icon from "../assets/linkedin_white.png";
import LoadingScreen from "../components/LoadingScreen";


const Splash = () => {
    const modal = useRef(null);
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        const video = document.getElementById("bg-video");

        return () => {
        video.addEventListener("loadeddata", handleVideoLoaded);
        };
    }, []);

    const handleVideoLoaded = () => {
        setVideoLoaded(true);
        console.log("Loaded...");
    };

    const handleOpen = () => {
        modal.current.showModal();
    };

    const handleClose = (e) => {
        if (e.target === modal.current) {
            modal.current.close();
        }
    };

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    return (
    <div className='splash-container'>
        {videoLoaded ? null : <LoadingScreen />}
        <div className='dialog-overlay' onClick={handleClose}>
            <dialog ref={modal}>
                <div className="dialog-header">
                    <h2>{isLoginForm ? "Login" : "Register"}</h2>
                </div>
                {isLoginForm ? (<LoginForm toggleForm={toggleForm}/>) 
                : (<RegisterForm toggleForm={toggleForm}/>)}
            </dialog>
        </div>
        <video id="bg-video" src={hsr_bg} autoPlay muted loop></video>
        <div className="splash-content">
            <div className="splash-overlay">
                <div className="splash-header">
                    <div>
                        <h1>Star Rail Messenger</h1>
                        <div>
                            <a href="https://www.linkedin.com/in/wchen42/" target='_blank' className='tooltip'>
                                <img src={linkedin_icon} alt="linkedIn" />
                            </a>
                            <a href="https://github.com/wichen42" target='_blank' className='tooltip'>
                                <img src={github_icon} alt="linkedIn" />
                            </a>
                            <a href="https://wilsonchen.dev/#contact" target='_blank' className='tooltip'>
                                <img src={mail} alt="linkedIn" />
                            </a>
                        </div>
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