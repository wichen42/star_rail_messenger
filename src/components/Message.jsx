import React, { useContext, useEffect, useRef, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const ref = useRef();


  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"});

    const getDate = () => {
      const fireBaseTime = new Date(
        message.date.seconds * 1000 + message.date.nanoseconds / 1000000
      );

      const unsub = () => {
        setDate(fireBaseTime.toLocaleDateString());
      };

      return () => {
        unsub();
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


  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="message-info">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
            <span>{date}</span>
        </div>
        <div className="message-content">
            <span>{username}</span>
            {message.text && <p>{message.text}</p>}
            {message.img && <img src={message.img} alt="" />}
        </div>
    </div>
  )
}

export default Message