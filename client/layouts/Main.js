import Chat from "@/components/shared/chat/Chat";
import Footer from "@/components/shared/footer/Footer";
import LoadingIndicator from "@/components/shared/loading/LoadingIndicator";
import Navbar from "@/components/shared/navbar/Navbar";

const Main = ({ children }) => {
  return (
    <div>
      {children}
      <Chat />
      <Navbar />
      <Footer />
      {/* <LoadingIndicator /> */}
    </div>
  );
};



export default Main;
