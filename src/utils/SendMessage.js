import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from 'uuid';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



const SendMessage = async (collection, chatId, message, image = null) => {
    const {currentUser} = useContext(AuthContext);

    // Update chats collection between users
    await updateDoc(doc(db, collection, chatId), {
        messages: arrayUnion({
            id: uuid(),
            text: message.text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
        })
    });

    // Update last message for current user
    await updateDoc(doc(db, "userChats", currentUser.uid), {
        [chatId + ".lastMessage"]: {
            text: message.text,
        },
        [chatId + ".date"]: serverTimestamp(),
    });

    // Update last message for receiving user
    await updateDoc(doc(db, "userChats", message.userId), {
        [chatId + ".lastMessage"]: {
            text: message.text,
        },
        [chatId + ".date"]: serverTimestamp(),
    });
}

export default SendMessage;