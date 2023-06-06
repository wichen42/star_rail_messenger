import React, { useContext, useEffect, useState } from 'react'
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Chat = () => {
  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  // TODO: NEED TO LOAD FIRST CHAT INSTEAD OF BLANK TO AVOID DB ISSUES 
  //       OR DISABLE INPUT UNTIL ANOTHER USER IS SELECTED

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
    // dispatch({type: "CHANGE_USER", payload: chat[1].userInfo})
    
  }, [currentUser.uid]);

  console.log(chats)

  return (
    <div className='chat'>
        <div className="chat-info">
          <span>{data.user?.displayName}</span>
          <div className="chat-icons">
            <span class="material-symbols-outlined">videocam</span>
            <span class="material-symbols-outlined">person_add</span>
            <span class="material-symbols-outlined">more_horiz</span>
          </div>
        </div>

        <Messages />
        <Input />
    </div>
  )
}

export default Chat