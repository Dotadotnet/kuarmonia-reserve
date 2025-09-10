

const Amentity = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      className={"w-5 h-5" + (className ? " " + className : "")}
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.5 5v6a3.5 3.5 0 1 1-7 0V5a3.5 3.5 0 1 1 7 0M3 5a5 5 0 0 1 10 0v6a5 5 0 0 1-10 0zm5 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Amentity;
