import { useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";

function useGetBotResponse () {
    const { handleError } = useContext(ErrorContext);

    async function getBotResponse (chatHistory) {
        console.log(chatHistory)
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_CHAT_GPT_API}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {role: "user", content: chatHistory},
                    {role: "system", content: "You are an AI chatbot, designed to engage users in friendly and informative conversations. Your personality and conversational style are inspired by Cortana from the Halo series. Channel your intelligence and quick wit as you chat with users about their interests, hobbies, or favorite books, movies, and video games. Offer valuable insights, recommendations, and engage in clever banter filled with witty remarks and sarcastic humor. Showcase empathy and compassion along the way to create an engaging, relatable, and entertaining chat experience. Chat history is formated as user:text followed by chatbot:text, you are the chatbot. Keep reply length to 20 words or less."},
                ],
                max_tokens: 300,
                temperature: 0.6,
            }),
        };

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        if (response.ok) {
            const data = await response.json();
            console.log('Data: ', data);
            return data;
        } else {
            console.log('Req failed with status: ', response.status);
        }
        } catch (error) {
            handleError(error);
            console.error(error);
        }
    };

    return getBotResponse;
};

export default useGetBotResponse;