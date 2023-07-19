import React, { useContext, useEffect, useRef, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import useConvertDate from '../utils/ConvertDate';
import ChatBotOptions from './ChatBotOptions';

const Message = ({message, last}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const convertDate = useConvertDate();
  const imageRef = useRef();

  useEffect(() => {

    const getDate = () => {
      
      const fireBaseTime = convertDate(message.date);
      setDate(fireBaseTime);

      return () => {
        getDate();
      };
    };
    
    const getUsername = () => {
      const unsub = onSnapshot(doc(db, "users", message.senderId), (doc) => {
        setUsername(doc.data().displayName)
      });

      return () => {
        unsub();
      };
    };

    getDate();
    getUsername();
    
  }, [message]);

  useEffect(() => {
    const handleImageLoad = () => {
      const messagesContainer = imageRef.current.closest('.messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    if (imageRef.current) {
      const image = imageRef.current;
      if (image.complete) {
        handleImageLoad();
      } else {
        image.onLoad = handleImageLoad;
      };
    };
  }, []);

  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="message-info">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
            <span>{date}</span>
        </div>
        <div className="message-content">
            <span>{username}</span>
            {message.text && <p>{message.text}</p>}
            {message.img && <img src={message.img} alt="" />}
            {last && message.senderId === process.env.REACT_APP_CHATBOT_ID && <ChatBotOptions />}
        </div>
    </div>
  )
}

export default Message