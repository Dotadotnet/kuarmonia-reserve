import Chat from "@/components/shared/chat/Chat";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import RouteLoadingIndicator from "@/components/shared/RouteLoadingIndicator";
import CurrencyRates from "@/hooks/useExchangeRatesToIRR";

const Main = ({ children }) => {
  return (
    <>
      <CurrencyRates />

      {children}
      <RouteLoadingIndicator />
      <Chat />
      <Navbar />
      <Footer />
    </>
  );
};

export default Main;
