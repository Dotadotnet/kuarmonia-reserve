import Chat from "@/components/shared/chat/Chat";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Main = ({ children }) => {
  return (
    <div >
      {children}
      <Navbar />
      <Chat />
      <Footer />
    </div>
  );
};

export default Main;
