import React, { useContext, useState } from 'react'
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
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const emotes = [emote_1, emote_2, emote_3, emote_4, emote_5, emote_6, emote_7, emote_8, emote_9, emote_10];

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
          console.log(`Something went wrong with input upload: ${error}`);
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
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

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

  return (
    <div className='input'>
      <dialog open>
        <form method='dialog'>
          {emotes.map((emote) => {
            return <img src={emote} alt="" />
          })}
          <button>X</button>
        </form>
      </dialog>
      <input type="text" placeholder='Type something...' onChange={(e) => setText(e.target.value)} value={text} onKeyDown={handleKey}/>
      <div className="send">
        <span class="material-symbols-outlined">sentiment_satisfied</span>
        <span class="material-symbols-outlined">attach_file</span>
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