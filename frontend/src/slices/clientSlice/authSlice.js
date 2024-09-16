import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


//define fake moke api
const API_URL = 'https://66b361f97fba54a5b7ecba9e.mockapi.io/login';

//---------------------------------------for google user data store in moke api--------------------------------------------

//save google user data in moke api
export const saveUserData = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    // console.log("save user...", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//for logout user
export const deleteUserApi = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);  //id define current user id which user want to delete
    console.log("delete user...", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//get user data using email
export const getUserApi = async (email) => {
  try {
    const response = await axios.get(`${API_URL}?email=${email}`);  //here match the email if match then return user data
    // console.log("get user...", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------create and login user using thunk--------------------------------------------


//add new user into database -- registration
export const registerUser = createAsyncThunk('auth/register', async (registerUserData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_URL);

    //check user already axits
    const userExists = data.some(user => user.email === registerUserData.email);

    if (userExists) {
      return rejectWithValue('User already exists');
    }
    else {
      await axios.post(API_URL, registerUserData);
      console.log("register user data.....", registerUserData);

      return registerUserData;
    }
  } catch (error) {
    return rejectWithValue('User registration failed');
  }
});

//fetch user from api -- login
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {

    //destructure data from credentials
    const { email, password } = credentials;

    //get data from api
    const response = await axios.get(`${API_URL}?email=${email}`);
    console.log("login user Data....", response);
    // return response.data;

    if (response.data.length === 0) {
      return rejectWithValue("user not found")
    }

    const user = response.data[0];

    //user user email and password is match then return user otherwise not
    if (user.email === email && user.password === password) {
      return user;
    }
    else {
      return rejectWithValue('Invalid credentials');
    }
  }
  catch (error) {
    return rejectWithValue('Login failed');
  }
});

//---------------------------------------define createSlice function--------------------------------------------

// CreateSlice automatically generates action creators and action types that according to the reducers and state
//CreateSlice function  value store in key value pair
const authSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    token: null,
    success: null,
    alreadyLoggedIn: false
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.alreadyLoggedIn = false;
    },
    setAlreadyLoggedIn: (state) => {
      state.alreadyLoggedIn = true;
    }
  },
 
  //when we want to perform any Asynchronous work or cross-slice commnucation like (work with api) then use extraReducers
  extraReducers: (builder) => {     //builder handle api all states using builder (here builder pass as an argument)

    //---------------------------------------------------REGISTRATION--------------------------------------------------

    //when we call api first time at that time api is in pending state
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;  //action.payload includes all users
      state.isAuthenticated = true;
      state.success = 'User registered successfully';

    })

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //---------------------------------------------------LOGIN--------------------------------------------------

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;  //incluides all users
      state.isAuthenticated = true;
      state.success = 'User login successfully';

    })

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

  }
});


export const { logoutUser, setAlreadyLoggedIn } = authSlice.actions;

export default authSlice;
