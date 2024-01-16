import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../utilities/firebaseApp'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
}, [])



    const signUpUser = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Sikeres regisztráció!');
        }
        catch(err) {
            console.log(err);
        }
    };

    const signInUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Sikeres belépés!');
        }
        catch(err) {
            console.log(err);
        }
    }

    const logOutUser = async () => {
        await signOut();
    }
console.log(user);
  return (
    <UserContext.Provider value={{user, signUpUser, logOutUser, signInUser}}>
        {children}
    </UserContext.Provider>

  )
}