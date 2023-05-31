import React, { useContext, useEffect, useRef, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const [date, setDate] = useState("");
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

    getDate();
    
  }, [message]);


  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="message-info">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
            {/* TODO: display date time */}
            <span>{date}</span>
        </div>
        <div className="message-content">
          {/* TODO: convert senderId into displayname */}
            <span>{message.senderId}</span>
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="" />}
        </div>
    </div>
  )
}

export default Message