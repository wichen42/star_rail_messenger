import React, { useContext, useState, useEffect, useRef } from 'react'
import Message from "./Message";
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const {data} = useContext(ChatContext);
  const messagesEndRef = useRef();

  useEffect(() => {
    
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      
      return () => {
        unsub()
      };
    }
    
    data.chatId && getMessages();

  }, [data.chatId]);

  useEffect(() => {
    const messagesContainer = document.querySelector('.messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [messages]);

  
  return (
    <div className='messages'>
      {messages.map((message, index) => {
        return <Message message={message} key={message.id} last={index === messages.length - 1}/>
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages