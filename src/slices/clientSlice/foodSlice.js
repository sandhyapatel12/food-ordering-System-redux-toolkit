import { createSlice } from "@reduxjs/toolkit";

// CreateSlice automatically generates action creators and action types that according to the reducers and state
//CreateSlice function  value store in key value pair
const foodSlice = createSlice({
    name: "foodCart",
    initialState: {
        cartItems: []
    },   //data store in an array format

    //give here all reducers for cartItems
    reducers:
    {
        //here is all action creators
        addFood(state, action) {

            //check existing item
            //if curFoodId(which id hit by user) is match with action.payload.id then perform following if else(that means data already exits)
            const existingFood = state.cartItems.find((curFoodId) => {
                return curFoodId.id === action.payload.id
            })

            if (existingFood) {
                state.cartItems = state.cartItems.map((curFood) => {
                    //if food already exits then already added food stay as it is and increse that food qty
                    //if food not alredy exits then return curFood as it is
                    return curFood.id === action.payload.id ? { ...curFood, qty: curFood.qty + 1 } : curFood
                })
            }
            //if food not alredy added in cart then push food into cart
            else {
                //push add new food to end of cartItems  (here push work safely means without touch pre added data(pre added data stay as it is like ...state))
                state.cartItems.push(action.payload)
            }
        },

        removeFood(state, action) {

            //delete specific food from cartItems
            //if user hit id not match with action.payload id then display all food which is inclkuded in cartItems or
            //if user hit id match with action.payload id then remove that item from cartItems and display rest of food items
            //here state.cartItems store new food items so all process store that
            state.cartItems = state.cartItems.filter((curFood) => {
                return curFood.id !== action.payload.id
            })

        },

        increseQty: (state, action) => {
            state.cartItems = state.cartItems.map((curFood) => {
                return curFood.id === action.payload.id ? { ...curFood, qty: curFood.qty + 1 } : curFood
            });
        },

        decreseQty: (state, action) => {
            state.cartItems = state.cartItems.map((curFood) => {
                return curFood.id === action.payload.id ? { ...curFood, qty: curFood.qty - 1 } : curFood
            });
        },


    }
})



//export action Creators and destructure them from userSlice.actions
export const { addFood, removeFood, increseQty, decreseQty} = foodSlice.actions;

export default foodSlice;

