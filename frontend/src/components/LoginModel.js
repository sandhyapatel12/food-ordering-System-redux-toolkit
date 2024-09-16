import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(true); // Modal is open initially

  const navigate = useNavigate()

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
    // navigate('/')
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">You are already logged in</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
