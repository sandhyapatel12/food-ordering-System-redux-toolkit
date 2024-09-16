import React from 'react'
import FoodCard from './FoodCard'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import FoodData from '../FoodData'

const FoodItems = () => {

  //for display food category wise
  const foodCategory = useSelector((state) => {
    return state.category.categoryItems
  })


  //for search food category wise
  const foodSearch = useSelector((state) => {
    return state.searchStore.searchItems
  })

  //for handle toast
  const handleToast = (name) => {
    toast.success(`Added ${name} `);
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className='  mx-auto max-w-7xl grid grid-cols-5 gap-8 my-5'>
        {/* filter category from db(here db is FoodData) */}
        {
          FoodData.filter((curFood) => {
            if (foodCategory === "All") {
              return curFood.name.toLowerCase().includes(foodSearch.toLowerCase());
            }
            else {
              //here category come from db (FoodData)
              return foodCategory === curFood.category && curFood.name.toLowerCase().includes(foodSearch.toLowerCase());
            }
          }).map((curFood) => {
            // pass data as a props
            return <FoodCard
              key={curFood.id}
              id={curFood.id}
              img={curFood.img}
              name={curFood.name}
              desc={curFood.desc}
              rating={curFood.rating}
              price={curFood.price}
              handleToast={handleToast} />
          })
        }

      </div>

    </>
  )
}

export default FoodItems
