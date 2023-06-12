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

  }, [currentUser.uid]);


  // TODO: 1. Figure out how to close off below useEffect correctly.
  //       2. Need to grab from start of chat list   
  // useEffect(() => {
  //     // Get most recent chat and load into Chat
  //     // console.log(chats);
  //     const chatDup = JSON.parse(JSON.stringify(chats));
  //     {chatDup && Object.entries(chatDup)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
  //       // console.log(chat[1]);
  //       // console.table(chat[1]);
  //       dispatch({type: "CHANGE_USER", payload: chat[1].userInfo})
  //   ))};

  // }, [chats, dispatch]);


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