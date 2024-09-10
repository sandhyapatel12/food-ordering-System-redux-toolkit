import React from 'react'
import { decreseQty, increseQty, removeFood } from '../slices/clientSlice/foodSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast';

//destructure data from cart
const CartItem = ({ id, name, img, price, qty }) => {

    const dispatch = useDispatch();

    return (
        <>
            <div className='bg-white shadow-xl rounded-md w-full px-3 py-2 flex space-x-3 mt-3 '>

                {/* food img */}
                <div>
                    <img src={img}
                        className='w-16 h-14' />
                </div>


                {/* food name and price  */}
                <div>
                    <h1 className=' font-semibold'>{name}</h1>
                    <h1 className='text-green-500 font-bold'>₹{price}</h1>
                </div>

                <div>
                    {/* delete food from cart */}
                    <i
                        onClick={() => 
                            //during delete process id is needed(this id define cur food id and come from cart.js(where define as a curFood id))
                            dispatch(removeFood({ id }),
                            //come from react-hot-toast lib(when user remove any item from cart then display this toast)
                            toast(`${name} Removed!`, {
                                icon: '👏',
                              }))}  
                        className="fa-solid fa-trash text-red-600 hover:text-red-700 ml-10"></i>

                    {/* increse-decrese food */}
                    <div className='text-xl flex items-center space-x-2 '>

                        <div>
                            <i
                                onClick={() => qty > 1 && dispatch(decreseQty({ id }))}  //if qty is bigger than 1 then decerse qty otherwise qty=1
                                className="fa-regular fa-square-minus hover:text-green-500"></i>
                        </div>

                        <div>{qty}</div>

                        <div>
                            <i
                                onClick={() => dispatch(increseQty({ id }))}  //here we can set our limited qty(like qty < 10)
                                className="fa-regular fa-square-plus hover:text-green-500"></i>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem
