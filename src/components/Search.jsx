import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);


  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }catch(error){
      setErr(true);
      console.log(`There was an error searching for user: ${error}`);
    }

  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch(username);
  };

  const handleSelect = async (u) => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      // check to see if chat already exists between users, if not create
      if (!res.exists()) {
        // create chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // update current user's userChats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // update other user's userChats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setErr(true);
      console.log(`There was an error fetching chats: ${error}`)
    }

    dispatch({type:"CHANGE_USER", payload: user});

    setUser(null);
    setUsername("");
  };

  return (
    <div className='search'>
      <div className='search-form'>
        <input type="text" placeholder='Find a User' 
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && 
        <div className='user-chat searched-user' onClick={()=>handleSelect(user)}>
          <img src={user.photoURL} alt="" />
          <div className='user-chat-info'>
            <span>{user.displayName}</span>
          </div>
        </div>
      }
    </div>
  )
}

export default Search