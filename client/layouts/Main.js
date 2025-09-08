import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
// import RouteLoadingIndicator from "@/components/shared/RouteLoadingIndicator";
import CurrencyRates from "@/hooks/useExchangeRatesToIRR";
import Chat from "@/components/shared/chat/page";
import Schema from "@/components/shared/seo/schema";

const Main = ({ children , schema = {} }) => {
  return (
    <>
    <Schema object={schema} />
    <div className="dark:bg-gray-900">
      <CurrencyRates />
      {children}
      {/* <Chat /> */}
      <Navbar />
      <Footer />
    </div>
    </>
  );
};

export default Main;
