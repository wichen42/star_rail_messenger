import hsr_bg from "../assets/hsr_bg.mp4";
import SplashModal from "../components/SplashModal";

const Splash = () => {


    return (
    <div className='login-container'>
        <video src={hsr_bg} autoPlay muted loop></video>
        <div className="splash-content">
            <div className="splash-overlay">
                <SplashModal />
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
                    <div className="splash-login">Login</div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Splash