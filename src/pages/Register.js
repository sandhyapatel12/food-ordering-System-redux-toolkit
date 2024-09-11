import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../slices/clientSlice/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  //usestate for set register user data
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });  //here define also that fields which is you define in api(use also same name)

  //destructure from formData
  const { name, email, password } = formData;

  const [emailError, setemailError] = useState('')

  //dispatch give order to action for do work as per instuctions 
  //dispatch trigger the action
  const dispatch = useDispatch();

  const navigate = useNavigate()

  //destructure from authSlices using useselector
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);    //state is a parameter and auth come from store where define in root reducers
  // console.log('register user...', user);


  //onchange for set new user data
  const onChange = (e) => {
    setFormData({
      ...formData,  //already added data stay as it is and add new data
      [e.target.name]: e.target.value
    });
  };

  //onsubmit for store new user data
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)); //registerUser  come from authSlice where we can create thunk and formData come from above where define as a usestate
    // { isAuthenticated && navigate('/login') }
    navigate('/login')
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
            <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">Register</h2>

            {/* if email and password is not match then display error */}
            {error && (
              <div className="mt-4 p-2 bg-red-500 text-white text-sm rounded mb-1">
                {error}
              </div>
            )}

            {/* login form */}
            <form onSubmit={onSubmit} className=''>

              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  value={name}
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  maxLength={25}
                  minLength={3}
                />
              </div>

              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  value={email}
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  maxLength={25}
                />

              </div>

              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  value={password}
                  name='password'
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  minLength={2}
                // maxLength={6}
                />

              </div>


              <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
                {loading ? 'Registring......' : 'Register'}
              </button>

            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
