import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import useSendMessage from "../utils/SendMessage";
import useSendBotMessage from "../utils/SendBotMessage";
import { ErrorContext } from "../context/ErrorContext";
import useGetBotResponse from "../utils/GetBotResponse";
import useGetChatHistory from "../utils/GetChatHistory";

const ChatBotOptions = () => {
    const optionsRef = useRef(null);
    const { data } = useContext(ChatContext);
    const { handleError } = useContext(ErrorContext);
    const [showOptions, setShowOptions] = useState(false);
    const sendMessage = useSendMessage();
    const sendBotMessage = useSendBotMessage();
    const getBotResponse = useGetBotResponse();

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const handleMore = (e) => {
        setShowOptions(!showOptions);
    };

    const handleOption = async (e) => {
        e.preventDefault();
        
        const optionText = e.target.textContent;

        const messageData = {
            text: optionText,
            chatId: data.chatId,
            userId: data.user.uid,
        };

        await sendMessage(messageData);

        try {
            const response = await getBotResponse(optionText);

            const botMessage = {
                text: response.choices[0].message.content,
                chatId: data.chatId,
                userId: data.user.uid,
            };

            console.log(botMessage.text);
            
            await sendBotMessage(botMessage);
            
        } catch (error) {
            handleError(error);
            console.error(error);
        };

        setShowOptions(!showOptions);
    };

    const handleClickOutside = (e) => {
        if (showOptions && optionsRef.current && !optionsRef.current.contains(e.target)) {
            setShowOptions(false);
            console.log(showOptions)
            console.log(optionsRef.current)
            console.log(e.target)
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        if (showOptions) {
            setShowOptions(false);
        };
    };

    return (
    <div className="chatbot-options-container">
        {!showOptions ? 
            (<span className="material-symbols-outlined" onClick={handleMore}>more_horiz</span>) 
            :
            (
                <div className="chatbot-options" ref={optionsRef}>
                    <span className="material-symbols-outlined" onClick={handleClose}>cancel</span>
                    <p onClick={handleOption}>Who are you?</p>
                    <p onClick={handleOption}>What is the inspiration behind this app?</p>
                    <p id="last-p" onClick={handleOption}>Tell me a joke!</p>
                </div>
            )
        }
    </div>
    )
}

export default ChatBotOptions