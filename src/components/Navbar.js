import React, { useEffect, useState } from 'react';
import FoodData from '../FoodData'
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../slices/clientSlice/categorySlice';
import LogoutModal from './LogoutModel';

const Navbar = () => {

    //for logout model
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Function to toggle the modal visibility
    const toggleLogoutModal = () => {
        setIsLogoutModalOpen(!isLogoutModalOpen);
    };

    //usestate for category
    const [categories, setcategories] = useState([])

    const dispatch = useDispatch();

    //for select food category
    const selectedCategory = useSelector((state) => {
        return state.category.categoryItems
    })

    //find unique category from database(here db is FoodData)
    const findUniqueCategory = () => {
        const uniqueCategory = [
            ...new Set(FoodData.map((curFoodCat) => curFoodCat.category)),  //here category come from db
        ]
        setcategories(uniqueCategory)
        // console.log(uniqueCategory);
    }

    //when user select food category then then useEffect run and display selected category
    useEffect(() => {
        findUniqueCategory();
    }, [])

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">

                <div>
                    <div className="text-white text-2xl font-bold">
                    Foodie's Haven
                    </div>
                    {/* display current date */}
                    <h1 className='text-gray-300 font-semibold'>{new Date().toUTCString().slice(0, 16)}</h1>
                </div>

                {/* food category */}
                <ul className="flex space-x-4 items-center">
                    <button
                        onClick={() => dispatch(addCategory("All"))}
                        className={`px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-gray-400 hover:text-white
                             ${selectedCategory === "All" && "bg-green-600 text-white"}`} >
                        All
                    </button>

                    {/* all category menu display dynamically using map method */}
                    {categories.map((curCategory, index) => {
                        return <button
                            onClick={() => dispatch(addCategory(curCategory))}
                            key={index}
                            className={`px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-gray-400 hover:text-white 
                                ${selectedCategory === curCategory && "bg-green-600 text-white"}`}>
                            {curCategory}
                        </button>
                    })
                    }

                </ul>

                <div>
                    <button
                        onClick={toggleLogoutModal}
                        className='px-6 py-2 bg-red-200 font-bold rounded-full hover:bg-gray-400 hover:text-white '>Logout</button>
                </div>

                {isLogoutModalOpen && (
                    //if model is open then close
                    <LogoutModal closeModal={toggleLogoutModal} />  //closeModal passing as a props to LogoutModel.js
                )}

            </div>
        </nav>
    );
}

export default Navbar;
