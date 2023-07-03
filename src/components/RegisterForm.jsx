import React, { useContext, useState } from 'react'
import addAvatar from "../assets/addAvatar.png";
import { ErrorContext } from '../context/ErrorContext';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const RegisterForm = ({toggleForm}) => {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const navigate = useNavigate();
    const { handleError } = useContext(ErrorContext);

    const handleImage = (e) => {
        const file = e.currentTarget.files[0];

        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setImage(file);
                setImageURL(fileReader.result);
            };
        };
    };

    const preview = imageURL ? <img src={imageURL} alt="" /> : null;

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
                            handleError(error);
                            console.error(`Error withupdateProfile: ${error}`);
                        }

                        try {
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL,
                            });
                        } catch(error) {
                            handleError(error);
                            console.error(`Error with setDoc: ${error}`);
                        }

                        try {
                            await setDoc(doc(db, "userChats", res.user.uid), {});
                        } catch(error) {
                            handleError(error);
                            console.error(`Error setting up default user chat: ${error}`);
                        }

                        navigate("/");

                    } catch(error) {
                        handleError(error);
                        console.error(`Error with updating upload: ${error}`);
                    }
                })
            })

        } catch(error) {
            handleError(error);
            console.error(error);
        };

        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Display Name"/>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <input type="file" id="file" style={{display:"none"}} placeholder="Avatar" onChange={handleImage}/>
            <label htmlFor="file">
                {preview ? preview : <img src={addAvatar} alt="" />}
                <span>Add an Avatar</span>
            </label>
            <button>Sign Up</button>
            <p>Already have an account? <span onClick={toggleForm}>Login</span></p>
        </form>
    );
}

export default RegisterForm