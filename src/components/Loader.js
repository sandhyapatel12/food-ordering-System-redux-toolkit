import React from 'react'

const Loader = () => {

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-80">
                <div className=" rounded-md text-center">
                    <img src='food-loader.gif' />
                </div>
            </div>

        </>
    )
}

export default Loader