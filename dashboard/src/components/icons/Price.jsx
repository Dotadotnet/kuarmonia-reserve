import React from "react";

const Price = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      className={"w-7 h-7" + (className ? " " + className : "")}
       xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M21.51 18.62a2.23 2.23 0 0 0 2 .88h1.18a2 2 0 0 0 2-2h0a2 2 0 0 0-2-2h-1.3a2 2 0 0 1-2-2h0a2 2 0 0 1 2-2h1.18a2.23 2.23 0 0 1 2 .88M24 11.5v-1m0 10v-1" strokeWidth={1}></path><rect width={37} height={20} x={5.5} y={5.5} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" rx={1} strokeWidth={1}></rect><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M8.69 5.5A3.19 3.19 0 0 1 5.5 8.69m37 0a3.19 3.19 0 0 1-3.19-3.19m-30.62 20a3.19 3.19 0 0 0-3.19-3.19m37 0a3.19 3.19 0 0 0-3.19 3.19" strokeWidth={1}></path><circle cx={34} cy={15.5} r={2} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}></circle><circle cx={14} cy={15.5} r={2} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}></circle><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M39.32 25.5H8.68a1 1 0 0 0-.91 1.43l1.1 2.31a1 1 0 0 0 .9.57h28.46a1 1 0 0 0 .9-.57l1.1-2.31a1 1 0 0 0-.91-1.43m-22.93 4.31H31.6v4.54H16.39z" strokeWidth={1}></path><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M35.88 34.35H12.12a1 1 0 0 0-1 .75l-1.89 7.4h29.54l-1.92-7.4a1 1 0 0 0-.97-.75" strokeWidth={1}></path></svg>
  );
};

export default Price;
