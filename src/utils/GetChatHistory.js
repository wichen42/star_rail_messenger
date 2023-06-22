import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// TODO: 1. PROCESS CHAT HISTORY
//         a. CONVERT SENDERID INTO DISPLAYNAME
//         b. FORMAT HISTORY TO DISPLAYNAME:TEXT && CHATBOT:TEXT
//         c. DELETE OLDEST CHAT HISTORY IF PASS TOKEN LIMIT

function useGetChatHistory () {

    const {currentUser} = useContext(AuthContext);
    
    async function getChatHistory (chatId) {
        const idMapping = {
            [currentUser.uid] : [currentUser.displayName],
            'mg7N4iGnF8V0nKAZvkgmiUguzal2' : 'chatbot',
        };
        const docSnap = await getDoc(doc(db, "chats", chatId));

        if (docSnap.exists()) {
            const history = docSnap.data().messages;
            const transformedHistory = history.map(({senderId, text}) => {
                const transformedId = idMapping[senderId] || senderId;
                return {
                    name: transformedId,
                    text: text,
                };
            });
            console.log(transformedHistory);

        } else {
            console.log("Issue with retrieving chat history...");
        }
    };

    return getChatHistory;
};

export default useGetChatHistory;