

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

const Location = ({ location }) => {


  return (
    <div className="flex flex-col gap-y-1.5 z-10">
      <h2 className="md:text-xl text-lg">Location</h2>
      <GeoLocation location={location} zoom={10} height="400px" />
    </div>
  );
};

export default Location;

