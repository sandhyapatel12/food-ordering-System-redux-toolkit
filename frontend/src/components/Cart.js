import React, { useState } from 'react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PxqP9P5gS7us9VDtYiPc9a7p0rLcXPaJtafBCcd8SyIj0LzTmrb5DTBDmrOtaM3IlZ9Gu3MjiDFoQLm4HzCUzD300Kpnpp38T');  //stripe publishable key


const Cart = () => {
  // usestate for open and close cart box
  const [activeCart, setactiveCart] = useState(false);

  // get data from our global store (redux store) (useSelector hook work like  useContext hook which through we can access context api data)
  const cartFoodList = useSelector((state) => {
    return state.cart.cartItems;
  });

  const {isAuthenticated} = useSelector((state) => state.auth)

  // find total  food items
  // cartFoodList includes all  foods which added in cart box
  // reduce method takes 2 argument (1) accumlator (is total ) (2) current value
  // here 0 work like initialState
  const totalFoodItems = cartFoodList.reduce((totalQty, newFood) => totalQty + newFood.qty, 0);

  // find total price
  const totalAmount = cartFoodList.reduce((totalPrice, newFood) => totalPrice + newFood.qty * newFood.price, 0);

  // payment integration(available backend code at backend/app.js file)
  const makePayment = async()=>{
    const stripe = await loadStripe("pk_test_51PxqP9P5gS7us9VDtYiPc9a7p0rLcXPaJtafBCcd8SyIj0LzTmrb5DTBDmrOtaM3IlZ9Gu3MjiDFoQLm4HzCUzD300Kpnpp38T");

    const body = {
        products:cartFoodList
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:7000/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}

    return (
        <>
            {/* // if activeCart is true then display cart */}
            <div className={`fixed top-0 right-0 bg-white h-full w-80 px-5 transition-all duration-500 z-50
                             ${activeCart ? "translate-x-0" : "translate-x-full"}`}>
                {/* here translate-x-full means hidden cart or translate-x-0 means display cart */}

                <div className='mt-5 text-2xl justify-between flex font-extrabold  text-blue-950'>
                    <h1>My Order</h1>
                    <i
                        onClick={() => setactiveCart(!activeCart)}  //if user click on close icon then close cart
                        className="fa-regular fa-rectangle-xmark"></i>
                </div>

                {/* if cart is empty then display following msg otherwise display food items */}
                {cartFoodList.length === 0 && <p className='text-lg text-green-600  mt-5 font-bold'>your cart is empty</p>}


                {/* display cart foods */}
                {
                    cartFoodList.map((curFood) => {
                        return <CartItem
                            key={curFood.id}
                            id={curFood.id}
                            img={curFood.img}
                            name={curFood.name}
                            price={curFood.price}
                            qty={curFood.qty} />  //passing as a props to cartItems.js
                    })
                }

                <div className='absolute bottom-0 mb-5'>
                    <div className='text-lg font-bold mb-3 '>
                        <h1>Items: {totalFoodItems}</h1>
                        <h1>Total Amount: {totalAmount}</h1>
                    </div>

                    <hr />

                    {/* if cart is empty then not display checkout button */}
                    {cartFoodList.length !== 0 &&
                        <div className=' mt-3'>
                            <button
                                onClick={makePayment}
                                // onClick={() => navigate('/success')}
                                className='text-lg font-bold bg-green-500 hover:bg-green-600 rounded-md px-5 py-2 text-gray-100'>checkout</button>
                        </div>
                    }
                </div>
            </div>

            {/* cart icon */}
            <button
                onClick={() => setactiveCart(!activeCart)}  //when user click on cart button cart box is open
                className={`fixed bottom-8 right-2 rounded-full w-20 h-20  shadow-xl flex items-center justify-center bg-yellow-500 hover:scale-110 cursor-grab transition-all duration-500 ease-in-out 
                ${totalFoodItems > 0 && "animate-bounce delay-500 transition-all"}`}>  {/* if cart is full then cart icon animated otherwise stay normal */}

                <i className="fa-solid fa-cart-shopping text-3xl  "></i>
            </button>
        </>
    )
}

export default Cart