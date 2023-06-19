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
  const [hasChats, setHasChats] = useState(false);

  // TODO: 1. POPULATE CHAT WINDOW WITH LATEST CHAT ON FIRST LOAD 

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

    if (!hasChats && chats) { 
      const chatIds = Object.keys(chats);
      console.log(chats);
      if (chatIds.length > 0) {
        const user = chats[chatIds[1]].userInfo;
        console.log(user);
        setHasChats(true);
      };
    };

  }, [currentUser.uid, hasChats, chats]);


  // {
  //   "uid": "n081XOLtRGcDtAn0D26XVlBJIt63",
  //   "photoURL": "https://firebasestorage.googleapis.com/v0/b/star-rail-messenger.appspot.com/o/alex?alt=media&token=9d141b62-6591-493f-816c-ce88f32f5c14",
  //   "displayName": "alex"
  // }


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