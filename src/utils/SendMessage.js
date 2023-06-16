import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from 'uuid';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function useSendMessage () {
    const {currentUser} = useContext(AuthContext);

    async function sendMessage (messageData, image = null) {
        // Update chats collection between users
        await updateDoc(doc(db, "chats", messageData.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text: messageData.text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
            })
        });

        // Update last message for current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [messageData.chatId + ".lastMessage"]: {
                text: messageData.text,
            },
            [messageData.chatId + ".date"]: serverTimestamp(),
        });

        // Update last message for receiving user
        await updateDoc(doc(db, "userChats", messageData.userId), {
            [messageData.chatId + ".lastMessage"]: {
                text: messageData.text,
            },
            [messageData.chatId + ".date"]: serverTimestamp(),
        });
    };
    
    return sendMessage;
}

export default useSendMessage;