import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import RouteLoadingIndicator from "@/components/shared/RouteLoadingIndicator";
import TickerTape from "@/components/[locale]/tickerTape/TickerTape";
import CurrencyRates from "@/hooks/useExchangeRatesToIRR";
import Chat from "@/components/shared/chat/Chat";

const Main = ({ children }) => {
  return (
    <div className="dark:bg-gray-900">
      <CurrencyRates />
      {children}
      <RouteLoadingIndicator />
      <Chat />
      <Navbar />
      <Footer />
    </div>
  );
};

export default Main;
