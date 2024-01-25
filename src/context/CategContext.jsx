import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { readCategories } from '../utilities/crudUtility'

export const CategContext=createContext()

export const CategProvider = ({children}) => {
    const [categories,setCategories]=useState([])

    useEffect(()=>{
        const unsubscribe=readCategories(setCategories)
        return ()=>unsubscribe()
    },[])

console.log(categories);

  return (
    <CategContext.Provider value={{categories}}>
        {children}
    </CategContext.Provider>
  )
}
