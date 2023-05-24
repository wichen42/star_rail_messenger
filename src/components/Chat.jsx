import React from 'react'
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className='chat'>
        <div className="chat-info">
          <span>User 1</span>
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