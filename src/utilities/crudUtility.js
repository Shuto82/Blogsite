import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "./firebaseApp"

export const readCategories = async (setCategories) => {
    const categRef = collection(db, 'categories');
    const docs = await getDocs(categRef);
        let arr = [];
        docs.forEach(doc => arr.push(doc.data()));
        setCategories(arr);
}

export const addPost=async (formData)=>{
    console.log(formData);
    const collectionRef=collection(db,'posts')
    const newItem={...formData, timestamp:serverTimestamp()}
    const newDocRef=await addDoc(collectionRef,newItem)
}