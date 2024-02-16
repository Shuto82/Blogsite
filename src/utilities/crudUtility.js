import { addDoc, arrayRemove, arrayUnion, collection,
     doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp,
      updateDoc, where } from "firebase/firestore"
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
    const collectionRef=collection(db,'posts');
    const newItem={...formData, timestamp: serverTimestamp()};
    const newDocRef = await addDoc(collectionRef, newItem);
}

export const readPosts = async (setPosts, selectedCateg)=>{
    const collectionRef=collection(db,'posts')
    const q = selectedCateg.length == 0 ? query(collectionRef,orderBy('timestamp','desc'))
     : query(collectionRef, where('category', 'in', selectedCateg))                                     
    const unsubscribe = onSnapshot(q,(snapshot)=>{
        setPosts(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
    return unsubscribe
}

export const readPost=async (id,setPost,setLikes=null)=>{
    const docRef=doc(db,"posts",id)
    try{
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
            setPost({...docSnap.data(),id:docSnap.id})
            setLikes && setLikes(docSnap.data().likes.length)
        }else
            console.log('A dokumentum nem létezik!');
    }catch(err){
        console.log(err);
    }
}

export const editLikes=async (postId,userId)=>{
    const docRef=doc(db,"posts",postId)
    const docSnap=await getDoc(docRef)
    //console.log(docSnap.data().likes.indexOf(userId));
    let likesCount=docSnap.data().likes.length
    if(docSnap.data().likes.indexOf(userId)==-1){
        likesCount++
        await updateDoc(docRef,{likes:arrayUnion(userId),likesCount})
    }else{
         likesCount--
        await updateDoc(docRef,{likes:arrayRemove(userId),likesCount}) 
    }
    //await update
    return likesCount
}