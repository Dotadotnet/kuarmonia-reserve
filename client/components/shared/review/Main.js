import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

import LoadingIndicator from "@/components/shared/loading/LoadingIndicator";

const Main = ({ children }) => {
  return (
    <div>
      <LoadingIndicator />
      {children}
      <Navbar />
      <Footer />
    </div>
  );
};

export default Main;
