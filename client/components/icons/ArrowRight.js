 

export const ArrowRight = ({ className, ...props }) => {
  return (
    <svg
      width="7.074"
      height="11.319"
      className={"w-3.5 h-3.5" + (className ? " " + className : "")}
      {...props}
      viewBox="0 0 7.074 11.319"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="#153e73" strokeLinecap="round" strokeWidth="2">
        <path d="M1.414 1.414l4.245 4.245M5.659 5.659L1.414 9.904" />
      </g>
    </svg>
  );
};
