function getChatBotResponse () {
    
    async function chatBotResponse (messageData) {
        const options = {
            method: "POST",
            body: JSON.stringify({message: messageData.text}),
            headers: {"Content-Type": "application/json"},
        };

        try {
            const response = await fetch('http://localhost:8000/chatbot', options);
            const data = await response.json();
            if (data) {
                return data;
            } else {
                console.log("no data");
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return chatBotResponse;
};

export default getChatBotResponse;
