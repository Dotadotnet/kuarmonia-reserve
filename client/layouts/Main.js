import Chat from "@/components/shared/chat/Chat";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import RouteLoadingIndicator from "@/components/shared/RouteLoadingIndicator";

const Main = ({ children }) => {
  return (
    <div>
      {children}
      <RouteLoadingIndicator />
      <Chat />
      <Navbar />
      <Footer />
    </div>
  );
};



export default Main;
