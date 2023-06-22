import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// TODO: 1. PROCESS CHAT HISTORY
//         a. CONVERT SENDERID INTO DISPLAYNAME
//         b. FORMAT HISTORY TO DISPLAYNAME:TEXT && CHATBOT:TEXT
//         c. DELETE OLDEST CHAT HISTORY IF PASS TOKEN LIMIT

function useGetChatHistory () {

    async function getChatHistory (chatId) {
        const docSnap = await getDoc(doc(db, "chats", chatId));
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Issue with retrieving chat history...");
        }
    };

    return getChatHistory;
};

export default useGetChatHistory;