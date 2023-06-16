import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from 'uuid';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


function useSendMessage () {
    const {currentUser} = useContext(AuthContext);

    async function sendMessage (messageData, image = null) {

        if (image) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {
                    console.error(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", messageData.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text: messageData.text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    }).then(console.log("chat update success..."))
                    .catch((error) => {
                        console.error(error);
                    });
                }
            );
        } else {
            // Update chats collection between users
            await updateDoc(doc(db, "chats", messageData.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: messageData.text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            });
        }
        
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