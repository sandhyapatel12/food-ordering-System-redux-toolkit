import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { deleteUserApi, logoutUser } from '../slices/clientSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';


//destructure from navbar where pass as a props
const LogoutModal = ({ closeModal }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch()

  //for user logout
  const userData = useSelector((state) => state.auth.user)
  console.log("logout user data is.......", userData);
  

  //for logout user
  const handleLogout = async () => {

    closeModal();

    //userData includes user all data
    if (userData) {
      await deleteUserApi(userData.id);   //id define current user id which user want to logout(id come from authSlice where define in deleteUserApi function)
      console.log("user data id...", userData.id);
      
    }
    dispatch(logoutUser());  //logoutUser come from authSlice where define in logoutUser reducers
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex items-center mb-4">
          <FiLogOut className="text-red-600 text-3xl mr-3" />
          <h2 className="text-lg font-bold text-red-600">Are you sure you want to logout?</h2>
        </div>
        <p className="mb-4 text-black">
          Once you logout, you will need to log in again. Are you okay with that?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
