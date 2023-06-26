import React, { useContext, useEffect, useState } from 'react'
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import useConvertDate from '../utils/ConvertDate';
import mail from "../assets/contact_me.png";
import github_icon from "../assets/github.png";
import linkedin_icon from "../assets/linkedin.png";

const Chat = () => {
  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [hasChats, setHasChats] = useState(false);
  const [linkedin, setLinkedIn] = useState(false);
  const [github, setGithub] = useState(false);
  const [contact,setContact] = useState(false)
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

  }, [currentUser.uid]);

  useEffect(() => {
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
      }

      setHasChats(true);
    }
  }, [hasChats, chats]);

  const handleLinkedInEnter = () => {
    setLinkedIn(true);
  };

  const handleLinkedInLeave = () => {
    setLinkedIn(false);
  };

  const handleGithubEnter = () => {
    setGithub(true);
  };

  const handleGithubLeave = () => {
    setGithub(false);
  };

  const handleContactEnter = () => {
    setContact(true);
  };

  const handleContactLeave = () => {
    setContact(false);
  };

  return (
    <div className='chat'>
        <div className="chat-info">
          <span>{data.user?.displayName}</span>
          <div className="chat-icons">
            <a href="https://www.linkedin.com/in/wchen42/" target='_blank' className='tooltip'
            onMouseEnter={handleLinkedInEnter}
            onMouseLeave={handleLinkedInLeave}
            >
              <img src={linkedin_icon} alt="linkedin" />
              {linkedin && <div className="tooltip-content">LinkedIn</div>}
            </a>
            <a href="https://github.com/wichen42" target='_blank' className='tooltip'
            onMouseEnter={handleGithubEnter}
            onMouseLeave={handleGithubLeave}
            >
              <img src={github_icon} alt="github" />
              {github && <div className="tooltip-content">Github</div>}
            </a>
            <a href="https://wilsonchen.dev/#contact" target='_blank' className='tooltip'
            onMouseEnter={handleContactEnter}
            onMouseLeave={handleContactLeave}
            >
              <img src={mail} alt="contact_me" />
              {contact && <div className="tooltip-content">Contact Me</div>}
            </a>
          </div>
        </div>

        <Messages />
        <Input />
    </div>
  )
}

export default Chat