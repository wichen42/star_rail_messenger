import { useEffect, useRef, useState } from "react";

const ChatBotOptions = () => {
    const optionsRef = useRef(null);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const handleMore = (e) => {
        e.preventDefault();
        setShowOptions(!showOptions);
    };

    const handleOption = (e) => {
        e.preventDefault();
        setShowOptions(!showOptions);
    };

    const handleClickOutside = (e) => {
        if (showOptions && optionsRef.current && !optionsRef.current.contains(e.target)) {
            setShowOptions(!showOptions);
        }
    };

    return (
    <div className="chatbot-options-container">
        {!showOptions && <span className="material-symbols-outlined" onClick={handleMore}>more_horiz</span>}
        {showOptions && (
            <div className="chatbot-options" ref={optionsRef}>
                <p onClick={handleOption}>Who are you?</p>
                <p onClick={handleOption}>What is the inspiration behind this app?</p>
                <p onClick={handleOption}>Tell me a joke!</p>
            </div>
        )}
    </div>
    )
}

export default ChatBotOptions