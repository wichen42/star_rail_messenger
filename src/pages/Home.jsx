import React from 'react'
import Register from "./Register";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";


const Home = () => {
  return (
    <div className="app-container glass">
      <div className='home'>
        <div className='container'>
            <Sidebar />
            <Chat />
        </div>
      </div>
    </div>
  )
}

export default Home;
