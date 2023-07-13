
const ChatBotOptions = () => {
    const handleMore = (e) => {
        e.preventDefault();
        console.log("clicked");
    };

    return (
    <div className="chatbot-options">
        <span className="material-symbols-outlined" onClick={handleMore}>more_horiz</span>
    </div>
    )
}

export default ChatBotOptions