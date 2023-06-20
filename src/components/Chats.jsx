import React, { useContext, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  //TODO: 1. REDUCE CHAT MESSAGE LENGTH ON SIDEBAR IF OVER 100 CHARS
  useEffect(() => {
    // fetch all of users chats
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
  
      return () => {
        unsub();
      };
    };

    // call getChats once currentUser is populated
    currentUser.uid && getChats();
    
  }, [currentUser.uid]);
  
  const handleSelect = (user) => {
    // console.log(user);
    dispatch({type: "CHANGE_USER", payload: user})
  };

  return (
    <div className='chats'>
      {chats && Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map(chat => (
        <div className='user-chat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className='user-chat-info'>
          <div>
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Chats