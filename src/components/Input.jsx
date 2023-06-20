import React, { useContext, useEffect, useRef, useState } from 'react'
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
import useSendMessage from '../utils/SendMessage';
import useSendBotMessage from '../utils/SendBotMessage';


const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [err, setErr] = useState(false);
  const dialogRef = useRef(null);
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const sendMessage = useSendMessage();
  const sendBotMessage = useSendBotMessage();

  const emotes = [emote_1, emote_2, emote_3, emote_4, emote_5, emote_6, emote_7, emote_8, emote_9, emote_10];

  //TODO: 1. TEST CHATBOT WITH CONDUCTOR ACC - CREATE NEW CHATBOT ACC WHEN READY

  const messageData = {
    text: text,
    chatId: data.chatId,
    userId: data.user.uid,
  };

  const handleSend = async () => {


    if (image) {
      await sendMessage(messageData, image);
    } else {
      await sendMessage(messageData);
    };

    setText("");
    setImage(null);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  const handleOpen = () => {
    dialogRef.current.showModal();
  };

  const handleClick = async (e) => {

    // grab emote file name from modal
    const src = e.target.getAttribute('src');
    const match = src.match(/emote_\d+/);

    if (match) {
      console.log(match[0]);
      // genereate ref from Google Cloud Storage URI
      const gsReference = ref(storage, `gs://star-rail-messenger.appspot.com/${match[0]}.png`)
      try {
        // update chats (group chat)
        getDownloadURL(gsReference).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });

        }).then(console.log("emote send sucess...."));
      } catch (error) {
        console.log(`Error with getDownloadURL: ${error}`);
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
    } else {
      console.log("Something went wrong with emote send: No match found");
    }
  };

  // TODO: FIRST POST REQUEST RETURNS BACK NULL. SUBSEQUENT REQUESTS ARE ONE INPUT BEHIND

  // Test function for chatgpt functionality - remove once handlesend chatbot is set up
  const handleTest = async () => {

    const testBot = {
      displayName: "The Conductor",
      email: "conductor@gmail.com",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/star-rail-messenger.appspot.com/o/The%20Conductor?alt=media&token=0e5f86c0-ba86-4848-b6e4-6f46ffad92ec",
      uid: "mg7N4iGnF8V0nKAZvkgmiUguzal2",
    };

    // Check if data.user === chatbot
    if (data.user.uid === "mg7N4iGnF8V0nKAZvkgmiUguzal2") {
      // Pass messageData to chatAPI for bot response
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: text,
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      try {
        const response = await fetch('http://localhost:8000/chatbot', options);
        if (response.ok) {
          const botData = await response.json();
          // console.log(botData.choices[0].message.content);
          const botMessage = {
            text: botData.choices[0].message.content,
            chatId: data.chatId,
            userId: data.user.uid,
          };

          // console.log(botMessage);
          // Update firebase collection for message to chatbot
          console.log(messageData);
          // await sendMessage(messageData);
          // Update firebase collection for message to current user
          // await sendBotMessage(botMessage);

        } else {
          console.log('Req failed with status: ', response.status);
        };
        
      } catch (error) {
        setErr(true);
        console.log(`Error with chatbot endpoint: ${error}`);
      };

    }

    


    
  };

  return (
    <div className='input'>
     <dialog className='emote-modal' ref={dialogRef}>
        <form method='dialog'>
          <button>X</button>
          <div>
            {emotes.map((emote, idx) => {
              return <img src={emote} key={idx} alt="" onClick={handleClick} />
            })}
          </div>
        </form>
      </dialog>
      <input type="text" placeholder='Type something...' onChange={(e) => setText(e.target.value)} value={text} onKeyDown={handleKey}/>
      <div className="send">
        <span className="material-symbols-outlined" onClick={handleOpen}>sentiment_satisfied</span>
        <input type="file" id="file" style={{display:"none"}} onChange={(e) => setImage(e.target.files[0])}/>
        <label htmlFor="file">
          <span className="material-symbols-outlined">image</span>
        </label>
          <button onClick={handleTest}>Test</button>
          <button onClick={handleSend} >Send</button>
      </div>
    </div>
  )
}

export default Input