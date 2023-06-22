import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import useSendMessage from '../utils/SendMessage';
import useSendBotMessage from '../utils/SendBotMessage';
import useGetChatHistory from '../utils/GetChatHistory';


const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [err, setErr] = useState(false);
  const dialogRef = useRef(null);
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const sendMessage = useSendMessage();
  const sendBotMessage = useSendBotMessage();
  const getChatHistory = useGetChatHistory();

// TODO: 1. IMPLEMENT CHAT HISTORY CONTEXT

  const messageData = {
    text: text,
    chatId: data.chatId,
    userId: data.user.uid,
  };

  const handleSend = async () => {

    // Messaging chatbot
    if (data.user.uid === "mg7N4iGnF8V0nKAZvkgmiUguzal2") {

      // Send messageData to firebase to update current user and chatbot collections
      await sendMessage(messageData);

      setText("");
      setImage(null);

      // Get data from chats collection
      const chatHistory = await getChatHistory(data.chatId);
      console.log(chatHistory);
      
      // Generate chatbot response
      const options = {
        method: "POST",
        body: JSON.stringify({message: text,}),
        headers: {"Content-Type": "application/json"},
      };

      try {
        const response = await fetch('http://localhost:8000/chatbot', options);
        
        if (response.ok) {
          const botData = await response.json();
          const botMessage = {
            text: botData.choices[0].message.content,
            chatId: data.chatId,
            userId: data.user.uid,
          };

          // Update firebase collection for message to current user
          await sendBotMessage(botMessage);

        } else {
          console.log('Req failed with status: ', response.status);
        };
        
      } catch (error) {
        setErr(true);
        console.log(`Error with chatbot endpoint: ${error}`);
      };

    } else {
      // Messaging human user
      if (image) {
        await sendMessage(messageData, image);
      } else {
        await sendMessage(messageData);
      };
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
          <button onClick={handleSend} >Send</button>
      </div>
    </div>
  )
}

export default Input