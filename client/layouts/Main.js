import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
// import RouteLoadingIndicator from "@/components/shared/RouteLoadingIndicator";
import CurrencyRates from "@/hooks/useExchangeRatesToIRR";
import Chat from "@/components/shared/chat/page";
import Schema from "@/components/shared/seo/schema";
import SwiperTransiotion from "@/components/shared/tools/swiperTransiotion";
const Main = ({ children, schema = {} }) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <div className="dark:bg-gray-900">
        <CurrencyRates />
        {children}
        <Chat />
        {/* <SwiperTransiotion /> */}
        <Navbar />
        <Footer />
      </div>
    </>
  );
};

export default Main;
