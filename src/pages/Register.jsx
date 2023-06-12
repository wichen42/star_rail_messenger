import React, { useContext } from "react";
import addAvatar from "../assets/addAvatar.png";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// TODO: 1. NEED TO ADDRESS NULL OBJECT ERROR WHEN REGISTERING. USERS CONFIRMED TO BE ADDED INTO DATABASE
//       2. HOVER STYLING OVER REGISTER BUTTON

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        try {
                            await updateProfile(res.user, {
                                displayName,
                                photoURL: downloadURL,
                            });
                        } catch(error){
                            console.log(`Error withupdateProfile: ${error}`)
                        }

                        try {
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL,
                            });
                        } catch(error) {
                            console.log(`Error with setDoc: ${error}`);
                        }

                        try {
                            // Create a default userChats object with chat bot
                            const bot = {
                                displayName: "The Conductor",
                                email: "conductor@gmail.com",
                                photoURL: "https://firebasestorage.googleapis.com/v0/b/star-rail-messenger.appspot.com/o/The%20Conductor?alt=media&token=0e5f86c0-ba86-4848-b6e4-6f46ffad92ec",
                                uid: "mg7N4iGnF8V0nKAZvkgmiUguzal2",
                            };
                            const combinedId = res.user.uid > bot.uid ? res.user.uid + bot.uid : bot.uid + res.user.uid;
                            await setDoc(doc(db, "userChats", res.user.uid), {
                                [combinedId + ".userInfo"] : {
                                    uid: bot.uid,
                                    displayName: bot.displayName,
                                    photoURL: bot.photoURL,
                                },
                                [combinedId + ".date"] : serverTimestamp(),
                                [combinedId + ".lastMessage"] : {
                                    text: "Welcome to Star Rail Messenger! I'm your personal chatbot, how can I help?",
                                },
                            });
                        } catch(error) {
                            console.log(`Error setting up default user chat: ${error}`);
                        }

                        navigate("/");

                    } catch(error) {
                        setErr(true)
                        console.log(`Error with updating upload: ${error}`)
                    }
                })
            })

        } catch(error) {
            setErr(true);
            console.log(error);
        };

        navigate("/");
    };

    // TODO: This might be causing an null object error since there is no current user on register / login until after form is submitted
    // if (currentUser) navigate("/");

    return (
        <div className="app-container glass">
            <div className="form-container">
                <div className="form-wrapper">
                    <div className="form-header">
                        <span className="logo">Star Rail Messenger</span>
                        <span className="title">Register</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Display Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <input type="file" id="file" style={{display:"none"}} placeholder="Avatar"/>
                        <label htmlFor="file">
                            <img src={addAvatar} alt="" />
                            <span>Add an Avatar</span>
                        </label>
                        <button>Sign Up</button>
                        {err && <span>Something went wrong with register...</span>}
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </form>
                </div>
    </div>
        </div>
    )
};

export default Register;