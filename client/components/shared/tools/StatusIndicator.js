import React from 'react';

const StatusIndicator = ({ isActive=true }) => {
  return (
    <div className="flex items-center">
      <span className="relative ml-3 mr-0.5 flex h-3 w-3">
        <span className={`animate-ping ${isActive ? 'bg-teal-400' : 'bg-red-400'} absolute inline-flex h-full w-full rounded-full opacity-75`}></span>
        <span className={` relative inline-flex h-3 w-3 rounded-full ${isActive ? 'bg-teal-400' : 'bg-red-400'}`}></span>
      </span>
    </div>
  );
};



export default StatusIndicator;
