import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotFound } from './NotFound';

export const AddEditPost = () => {
  const {user} = useContext(UserContext);
  if (!user) return <NotFound />;

  return (
    <div>AddEditPost</div>
  )
}
