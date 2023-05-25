import React, { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    }catch(error){
      setErr(true);
      console.log(`There was an error searching for user: ${error}`);
    }

  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch(username);
  };

  return (
    <div className='search'>
      <div className='search-form'>
        <input type="text" placeholder='Find a User' 
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && <div className='user-chat'>
        <img src={user.photoURL} alt="" />
        <div className='user-chat-info'>
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search