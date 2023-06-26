import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import useTruncateHistory from "./TruncateHistory";

function useGetChatHistory () {

    const {currentUser} = useContext(AuthContext);
    const truncateHistory = useTruncateHistory();
    
    async function getChatHistory (chatId) {
        const idMapping = {
            [currentUser.uid] : [currentUser.displayName],
            'mg7N4iGnF8V0nKAZvkgmiUguzal2' : 'chatbot',
        };
        const docSnap = await getDoc(doc(db, "chats", chatId));

        if (docSnap.exists()) {
            const history = docSnap.data().messages;
            // Convert and condense chats collections object 
            const transformedHistory = history.map(({senderId, text}) => {
                const transformedId = idMapping[senderId] || senderId;
                return {
                    name: transformedId,
                    text: text,
                };
            });
            const transformedStr = transformedHistory.map(({name, text}) => `${name}: ${text}`)
            .join("|||");

            return truncateHistory(transformedStr, 200);

        } else {
            console.log("Issue with retrieving chat history...");
        }
    };

    return getChatHistory;
};

export default useGetChatHistory;