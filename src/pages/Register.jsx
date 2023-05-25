import React from "react";
import addAvatar from "../assets/addAvatar.png";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

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
                            await setDoc(doc(db, "userChats", res.user.uid), {});
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
    };

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
                        {err && <span>Something went wrong...</span>}
                        <p>Already have an account? Login</p>
                    </form>
                </div>
    </div>
        </div>
    )
};

export default Register;