

const Container = ({ children, className }) => {
  return (
    <section
      className={
        " mx-auto max-w-7xl  dark:bg-gray-900" + (className ? ` ${className}` : ""+ "") 
      }
    >
      {children}
    </section>
  );
};

export default Container;
