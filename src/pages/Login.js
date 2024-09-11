// Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../slices/clientSlice/authSlice';
import GoogleLogin from '../components/GoogleLogin';

const Login = () => {

  //usestate for set login user data
  const [formData, setFormData] = useState({ email: '', password: '' });


  //dispatch give order to action for do work as per instuctions 
  //dispatch trigger the action
  const dispatch = useDispatch()

  const navigate = useNavigate()

  //destructure from authSlices using useselector
  const { loading, error, user, isAuthenticated } = useSelector((state) => state.auth);  //state is a parameter and auth come from store where define in root reducers
  // console.log("current user is......", user);
  // console.log(user.name);


  const onChange = (e) => {
    setFormData({
      ...formData,   //already added data stay as it is and add new data
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();   //page can't reload
    dispatch(loginUser(formData));  //loginUser  come from authSlice where we can create thunk and formData come from above where define as a usestate
    { isAuthenticated && navigate('/home') }
  };

  


  return (
    <>

      <div className="flex h-screen">

        {/* Left side: Food Image */}
        <img className="w-1/2  bg-gray-500 bg-center " src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl6emF8ZW58MHx8MHx8fDA%3D">
        </img>

        {/* Right side: Login Form */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-black">

          <div className="bg-gray-700 bg-opacity-50 p-8 rounded-lg shadow-lg w-3/4 max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">Login</h2>

            {/* if email and password is not match then display error */}
            {error && (
              <div className="mt-4 p-2 bg-red-500 text-white text-sm rounded mb-1">
                {error}
              </div>
            )}

            {/* login form */}
            <form onSubmit={onSubmit}>

              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"

                />
              </div>

              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  name='password'
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <Link
                  className="inline-block align-baseline mt-1 text-sm text-gray-400 hover:text-orange-800"
                  href="#"
                >
                  Forgot Password?
                </Link>
              </div>


              <button type="submit" className="w-full bg-orange-500 text-white font-bold hover:bg-orange-600 py-2 rounded">
                {loading ? 'Logging in......' : 'Login'}
              </button>

              <Link to='/register'>
                <button type="submit" className="w-full bg-green-700 mt-3 text-white font-bold hover:bg-green-800 py-2 rounded">Create a New Account</button>
              </Link>


              <div className='flex items-center justify-center text-gray-300  mt-2 space-x-2'>
                <div>---------------------</div>
                <div className='text-xs'>OR</div>
                <div>---------------------</div>
              </div>
            </form>
            {/* //--------login with google button-------------------------- */}

            {/*  here login with google button also define out of form other wise simple login credentials do matters */}
            <GoogleLogin />

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
