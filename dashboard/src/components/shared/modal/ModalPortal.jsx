import ReactDOM from "react-dom";

const ModalPortal = ({ children }) => {
  if (typeof window === "undefined") return null; // برای SSR
  return ReactDOM.createPortal(children, document.body);
};

export default ModalPortal;
