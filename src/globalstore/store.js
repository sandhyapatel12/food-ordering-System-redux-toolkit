import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "../slices/clientSlice/foodSlice";
import categorySlice from "../slices/clientSlice/categorySlice";
import searchSlice from "../slices/clientSlice/searchSlice";
import authSlice from "../slices/clientSlice/authSlice";


//store is a object that holds the complete state of app
//store is a global store from where we can access all data
//configureStore creates a well-configured Redux store with a single function call, including combining reducers(instead of combineReducers)
const store = configureStore({      //configureStore function store value  in a key value pair and accepts single configuration object parameter

    //work also root reducer and combine reducers
    //here define all reducers
    reducer: {

        //give here all reducers
        cart: foodSlice.reducer,  //this reducers define our  UserSlice reducers which is define in createSlice function
        category: categorySlice.reducer  ,   //this reducers define our todoSlice reducers which is define in createSlice function
        searchStore : searchSlice.reducer,
        auth: authSlice.reducer,

    }
})

export default store;