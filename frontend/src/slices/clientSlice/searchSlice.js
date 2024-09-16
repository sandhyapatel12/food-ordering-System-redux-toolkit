import { createSlice } from "@reduxjs/toolkit";

// CreateSlice automatically generates action creators and action types that according to the reducers and state
//CreateSlice function  value store in key value pair
const searchSlice = createSlice({
    name: "searchList",
    initialState: {
        searchItems: ""
    },   //data store in an array format

    //give here all reducers for cartItems
    reducers:
    {
        //here is all action creators
        setSearchItem(state, action) {
            state.searchItems = action.payload;
            // console.log(state.searchItems);
            
        }
    }
})



//export action Creators and destructure them from userSlice.actions
export const { setSearchItem} = searchSlice.actions;

export default searchSlice;

