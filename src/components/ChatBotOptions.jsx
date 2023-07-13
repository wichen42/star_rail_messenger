import { useEffect, useState } from "react";

const ChatBotOptions = () => {
    const [showOptions, setShowOptions] = useState(false);

    const handleMore = (e) => {
        e.preventDefault();
        setShowOptions(!showOptions);
    };

    const handleOption = (e) => {
        e.preventDefault();
        setShowOptions(!showOptions);
    };

    return (
    <div className="chatbot-options-container">
        {!showOptions && <span className="material-symbols-outlined" onClick={handleMore}>more_horiz</span>}
        {showOptions && (
            <div className="chatbot-options">
                <p onClick={handleOption}>Who are you?</p>
                <p onClick={handleOption}>What is the inspiration behind this app?</p>
                <p onClick={handleOption}>Tell me a joke!</p>
            </div>
        )}
    </div>
    )
}

export default ChatBotOptions