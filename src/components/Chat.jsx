import React, { useContext, useEffect, useState } from 'react'
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import useConvertDate from '../utils/ConvertDate';

const Chat = () => {
  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [hasChats, setHasChats] = useState(false);
  const convertDate = useConvertDate();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      
      return () => {
        unsub();
      };
    };
    
    currentUser.uid && getChats();

    // Load initial chat
    if (!hasChats && chats && Object.keys(chats).length > 0) {
      const chatList = Object.values(chats);
      let mostRecentUser = null;
      let mostRecentDate = null;

      chatList.forEach((chat) => {
        const chatDate = chat.date;
        const convertedDate = convertDate(chatDate);

        if (!mostRecentDate || convertedDate > mostRecentDate || (convertedDate === mostRecentDate &&
            (chatDate.seconds > mostRecentDate.seconds ||
            (chatDate.seconds === mostRecentDate.seconds && chatDate.nanoseconds > mostRecentDate.nanoseconds)))) {
          mostRecentUser = chat.userInfo;
          mostRecentDate = convertedDate;
        }
      });

      if (mostRecentUser) {
        dispatch({ type: "CHANGE_USER", payload: mostRecentUser });
        // console.log('User with most recent date:', mostRecentUser);
      }

      setHasChats(true);
    }

  }, [currentUser.uid, hasChats, chats])


  return (
    <div className='chat'>
        <div className="chat-info">
          <span>{data.user?.displayName}</span>
          <div className="chat-icons">
            <span className="material-symbols-outlined">videocam</span>
            <span className="material-symbols-outlined">person_add</span>
            <span className="material-symbols-outlined">more_horiz</span>
          </div>
        </div>

        <Messages />
        <Input />
    </div>
  )
}

export default Chat