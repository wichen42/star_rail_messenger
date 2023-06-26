import React, { useContext } from 'react'
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { ErrorContext } from '../context/ErrorContext';
import ErrorModal from '../components/ErrorModal';

const Home = () => {
  const { error } = useContext(ErrorContext);

  return (
    <div className="app-container">
      <div className='home'>
        <div className='container'>
            <Sidebar />
            <Chat />
        </div>
      </div>
      {error && <ErrorModal error={error}/>}
    </div>
  )
}

export default Home;
