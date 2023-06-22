import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function useGetChatHistory () {

    async function getChatHistory (chatId) {
        const docSnap = await getDoc(doc(db, "chats", chatId));
        if (docSnap.exists()) {
            const chatHistory = docSnap.data();
            console.log(chatHistory);
        } else {
            console.log("Issue with retrieving chat history...");
        }
    };

    return getChatHistory;
};

export default useGetChatHistory;