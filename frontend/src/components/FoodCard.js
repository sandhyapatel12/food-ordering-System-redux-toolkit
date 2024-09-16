import React from 'react'
import { useDispatch } from 'react-redux'
import { addFood } from '../slices/clientSlice/foodSlice'

//destructure data from FoodItems.js
const FoodCard = ({ id, img, name, price, desc, rating, handleToast }) => {

    //dispatch give order to action for do work as per instuctions 
    //dispatch trigger the action
    const dispatch = useDispatch()


    return (
        <>
            <div className="font-bold w-[250px] bg-white shadow-xl p-5 flex flex-col rounded-lg gap-2">
                {/* food img */}
                <img
                    src={img}
                    alt=""
                    className="w-auto h-[130px]  hover:scale-110 cursor-grab transition-all duration-500 ease-in-out "
                />

                {/* food name and price */}
                <div className="text-sm flex justify-between">
                    <h2>{name}</h2>
                    <span className="text-green-500 ">₹ {price}</span>
                </div>

                {/* food desc */}
                <p className="text-sm font-normal">{desc.slice(0, 50)}...</p>

                <div className="flex justify-between ">

                    {/* food ratings  */}
                    <span className="flex justify-center items-center">
                        <i className="fa-solid fa-star text-yellow-400"></i> {rating}
                    </span>

                    {/* add to cart button */}
                    <button
                        onClick={() =>
                            dispatch(addFood({ id, name, price, img, qty: 1 }), //push that value which we want to display in cart
                                handleToast(name))}

                        className="p-1 text-white bg-green-500 hover:bg-green-600 rounded-lg text-sm">
                        Add to cart
                    </button>

                </div>
            </div>
        </>
    )
}

export default FoodCard