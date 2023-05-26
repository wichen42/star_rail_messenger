import React, { useContext } from 'react'
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const {data} = useContext(ChatContext);

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