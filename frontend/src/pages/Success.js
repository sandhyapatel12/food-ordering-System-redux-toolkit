import React, { useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";

const Success = () => {

  //usestate for display loader
  const [loading, setloading] = useState(true)

  //when page first time render display loader only one time
  useEffect(() => {
    //after 2 second loader false
    setTimeout(() => {
      setloading(false)
    }, 2000);
  }, [])


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {
        //if loading true then display loader otherwise display success msg
        loading ? <RiseLoader color="#14c54e" />

          :

          <div>
            <h2 className="text-3xl  mb-4 text-center text-green-600 font-bold">
              Payment Successful!
            </h2>
            <p className="">Your order has been sucessfully placed</p>
          </div>
      }
    </div>
  );
};

export default Success;
