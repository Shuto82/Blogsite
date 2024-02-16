import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { readPosts } from '../utilities/crudUtility';
import { PostCard } from './PostCard';

export const Posts = ({selectedCateg}) => {
  const [posts, setPosts] = useState([]);

useEffect(() => {
  readPosts(setPosts, selectedCateg)
},[selectedCateg])

console.log(posts);

return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 
    10, justifyContent: 'center'}}>
      {posts.length == 0 && <div>Nincs találat ebben a kategóriában</div> }
      {posts.map(obj => <PostCard key={obj.id} {...obj} />)}
    </div>
  )
}
