import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../utilities/firebaseApp'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();
    
useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
}, [])



    const signUpUser = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMsg(null);
            navigate('signinup/in')
        }
        catch(err) {
            setMsg(err.message);
        }
    };

    const signInUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMsg(null);
            navigate('/');
        }
        catch(err) {
            setMsg('Hibás e-mail cím és/vagy jelszó');
        }
    }

    const logOutUser = async () => {
        await signOut(auth);
        navigate('/');
    }

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Link elküldve!');
            navigate('signinup/in')
        }
        catch(err) {
            console.log(err);
        }
    }


console.log(user);
  return (
    <UserContext.Provider value={{user, signUpUser, logOutUser, signInUser, resetPassword, msg}}>
        {children}
    </UserContext.Provider>

  )
}