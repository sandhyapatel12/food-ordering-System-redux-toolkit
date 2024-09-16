import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import FoodItems from '../components/FoodItems'
import Cart from '../components/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchItem } from '../slices/clientSlice/searchSlice'
import UserProfile from '../components/UserProfile'
import Loader from '../components/Loader'
import LogoutModal from '../components/LogoutModel'

const Home = () => {

  //dispatch for search food
  const dispatch = useDispatch()

  //usestate for display loader
  const [loader, setloader] = useState(true);


  //loader will be false after  4 second and redirect at home page (home -> which mention in app.js)
  setTimeout(() => {
    setloader(false)
  }, 4000);

 

  return (

    <>
    {/* before display home page first display loader */}
      {
        loader && <Loader />  //if loader is true then display
      }


      <Navbar />

      {/* Search food */}
      <div className='flex max-w-7xl mx-auto '>
        <div className='max-w-lg mx-auto flex flex-col mt-3 items-center'>
          <h1 className='font-bold text-lg mb-3 text-green-500'>Search Your Food</h1>
          <input
            onChange={(e) => dispatch(setSearchItem(e.target.value))}
            type="search"
            name="search"
            className="w-full py-2 px-10 rounded-md bg-white shadow-2xl focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Search Your Food..."
            autoComplete='off'
          />
        </div>

        <UserProfile />

      </div>
      <FoodItems />
      <Cart />
    </>
  )
}

export default Home
