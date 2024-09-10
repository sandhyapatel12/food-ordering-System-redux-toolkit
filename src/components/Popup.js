import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Popup = ({popupData}) => {

//usestate for display popup
const [showSuccessPopup, setShowSuccessPopup] = useState(false);

const navigate = useNavigate();

//popup will be true for only 2 second
setTimeout(() => {
    setShowSuccessPopup(true)
    navigate('/')
}, 2000);

return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
                <div className="bg-green-200 shadow-2xl p-6 rounded-md text-center">
                    <h2 className="text-2xl font-semibold text-green-500">{popupData}</h2>
                </div>
            </div>
        </>
    )
}

export default Popup
