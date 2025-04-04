import React from "react";
import { MoonLoader  } from "react-spinners"; 

const MoonLoaderLoading = ({size=20,color="white"}) => {
  return (
    <div className="flex justify-center items-center ">
      <MoonLoader 
      size={size}  color={color} loading={true} />
    </div>
  );
};

export default MoonLoaderLoading;
