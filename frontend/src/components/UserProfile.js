import React from 'react'
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const userData = useSelector((state) => {
    return state.auth.user
  })
  console.log("user img...", userData.picture);


  return (
    <>
      <div className='mt-3'>
        <div className='flex items-center space-x-2'>
          <img
            src={userData.picture ? userData.picture : '/noAvatar.png'}
            alt={userData.name || 'User Profile'}
            className='h-12 w-12 ring-1 rounded-full shadow-lg'
          />
          <div>
            <p className='font-bold'>{userData.name}</p>
            <p className=' text-sm text-green-600 font-bold'>{userData.email}</p>

          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile