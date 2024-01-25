import React from 'react'
import { Categories } from '../components/Categories';
import { Posts } from '../components/Posts';
import { useState } from 'react'

export const Home = () => {
  const [selectedCateg, setSelectedCateg] = useState([]);
  //console.log(selectedCateg);

  return ( 
    <div className='home'>
      <div className='categ'>
        <Categories setSelectedCateg={setSelectedCateg} selectedCateg= {selectedCateg} />
      </div>
      <div className='posts'>
        <Posts />
      </div>
    </div>
  )
}
