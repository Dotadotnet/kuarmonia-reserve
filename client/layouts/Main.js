import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
// import RouteLoadingIndicator from "@/components/shared/RouteLoadingIndicator";
import CurrencyRates from "@/hooks/useExchangeRatesToIRR";
import Chat from "@/components/shared/chat/page";
import TopContactBar from "@/components/shared/TopContactBar";

const Main = ({ children, schema = {} }) => {
  return (
    <>
      <div className="dark:bg-gray-900 flex flex-col min-h-screen">
        <TopContactBar />
        
        <CurrencyRates />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Chat />
        <Footer />
      </div>
    </>
  );
};

export default Main;