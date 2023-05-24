import React from 'react'
import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";

const Home = () => {
  return (
    <div className='home-container'>
        
        <div className='chat-overlay'>
            <Sidebar />
            <Messages />
        </div>
    </div>
  )
}

export default Home;
