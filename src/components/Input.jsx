import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import emote_1 from "../assets/emotes/emote_1.png";
import emote_2 from "../assets/emotes/emote_2.png";
import emote_3 from "../assets/emotes/emote_3.png";
import emote_4 from "../assets/emotes/emote_4.png";
import emote_5 from "../assets/emotes/emote_5.png";
import emote_6 from "../assets/emotes/emote_6.png";
import emote_7 from "../assets/emotes/emote_7.png";
import emote_8 from "../assets/emotes/emote_8.png";
import emote_9 from "../assets/emotes/emote_9.png";
import emote_10 from "../assets/emotes/emote_10.png";


const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [err, setErr] = useState(false);
  const dialogRef = useRef(null);
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const emotes = [emote_1, emote_2, emote_3, emote_4, emote_5, emote_6, emote_7, emote_8, emote_9, emote_10];

  //TODO: 1. NEED TO ADDRESS FIREBASE STORAGE OBJECT DOES NOT EXSIST ERROR. DISABLE IMAGE UPLOAD TIME BEING.
  //      2. DISABLE INPUT IF NO USER SELECTED
  const handleSend = async () => {

    if (!data) {
      console.log("No chat selected");
      setErr(true);
      return;
    };

    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      
      // console.log(image)
      // console.log(storageRef)
      uploadTask.on(
        (error) => {
          console.log(`Something went wrong with input upload: ${error}`);
          console.log(image);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          }).then(console.log("chat update success..."))
          .catch( error => {
            console.log(`Error: ${error}`);
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    };

    // Update last message for current user
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    // Update last message for other user
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  const handleOpen = () => {
    dialogRef.current.showModal();
  };

  const handleClick = (e) => {

    const src = e.target.getAttribute('src');
    const match = src.match(/emote_\d+/);

    if (match) {
      console.log(match[0]);
    } else {
      console.log("No match found");
    }
  };

  return (
    <div className='input'>
     <dialog className='emote-modal' ref={dialogRef}>
        <form method='dialog'>
          <button>X</button>
          <div>
            {emotes.map((emote) => {
              return <img src={emote} alt="" onClick={handleClick} />
            })}
          </div>
        </form>
      </dialog>
      <input type="text" placeholder='Type something...' onChange={(e) => setText(e.target.value)} value={text} onKeyDown={handleKey}/>
      <div className="send">
        <span class="material-symbols-outlined" onClick={handleOpen}>sentiment_satisfied</span>
        <input type="file" id="file" style={{display:"none"}} onChange={(e) => setImage(e.target.files[0])}/>
        <label htmlFor="file">
          <span class="material-symbols-outlined">image</span>
        </label>
          <button onClick={handleSend} >Send</button>
      </div>
    </div>
  )
}

export default Input