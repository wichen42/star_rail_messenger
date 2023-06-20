import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from 'uuid';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useSendBotMessage () {
    const {currentUser} = useContext(AuthContext);
    
    async function sendBotMessage (botMessage) {
        // Update chats collection with bot response between chatbot and current user
        try {
            await updateDoc(doc(db, "chats", botMessage.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: botMessage.text,
                    senderId: "mg7N4iGnF8V0nKAZvkgmiUguzal2",
                    date: Timestamp.now(),
                }),
            });
        } catch (error) {
            console.log(`Error with updating chatbot's userChats: ${error}`);
        };

        // Update last message for current user
        try {
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [botMessage.chatId + ".lastMessage"]: {
                    text: botMessage.text,
                },
                [botMessage.chatId + ".date"]: serverTimestamp(),
            });
        } catch (error) {
            console.log(`Error with updating current user's last message for bot response: ${error}`);
        }

        // Update last message for chatbot
        try {
            await updateDoc(doc(db, "userChats", botMessage.userId), {
                [botMessage.chatId + ".lastMessage"]: {
                    text: botMessage.text,
                },
                [botMessage.chatId + ".date"]: serverTimestamp(),
            });
        } catch (error) {
            console.log(`Error with updating chatbot's last message: ${error}`);
        }
    };

    return sendBotMessage;
};

export default useSendBotMessage;