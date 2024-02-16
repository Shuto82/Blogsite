import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { editLikes, readPost } from '../utilities/crudUtility';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Details = () => {
  const {user} = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(null);
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    readPost(params.id, setPost, setLikes)
  },[])

  const handleLikes = async () => {
    if (user) {
      const likesCount = await editLikes(params.id, user.uid);
      setLikes(likesCount);
    try {

    }
    catch {

    }}
    else {
      console.log("Csak bejelentkezve lehet lájkolni!");
    }
  }

  return (
    <div className='container details'>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      {post && <img src={post?.photoUrl} alt={post?.title} className='post-img' />}
      </div>
      <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
        {post && parse(post.description)}
      </div>
      {user && <div className='d-flex justify-content-between'>
        <span><ThumbUpIcon sx={{color: 'blue'}} onClick={handleLikes} />{likes}
        </span>
        <span><DeleteIcon sx={{color: 'red'}} /><EditIcon sx={{color: 'green'}} /></span>
      </div>}
      <div className='d-flex justify-content-center'>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Vissza</button>
      </div>
    </div>
  )
} 
