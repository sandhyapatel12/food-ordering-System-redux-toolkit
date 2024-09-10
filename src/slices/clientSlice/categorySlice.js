import { createSlice } from "@reduxjs/toolkit";

// CreateSlice automatically generates action creators and action types that according to the reducers and state
//CreateSlice function  value store in key value pair
const categorySlice = createSlice({
    name: "categoryList",
    initialState: {
        categoryItems: "All"
    },   //data store in an array format

    //give here all reducers for cartItems
    reducers:
    {
        //here is all action creators
        addCategory(state, action) {
            state.categoryItems = action.payload;
            // console.log(state.categoryItems);
            
        }
    }
})



//export action Creators and destructure them from userSlice.actions
export const { addCategory} = categorySlice.actions;

export default categorySlice;

