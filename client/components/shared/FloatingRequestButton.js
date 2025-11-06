import { useState } from "react";
import { MessageCircle } from "lucide-react";
import RequestForm from "./RequestForm";
import { useTranslations } from "next-intl";
import Modal from "./modal/Modal";

const FloatingRequestButton = ({ serviceType = "other", specificTypeId = null }) => {
  const t = useTranslations("FloatingRequestButton");
  const [isFormOpen, setIsFormOpen] = useState(false);
  console.log(specificTypeId)
  return (
    <>
      {/* Desktop version - fixed at bottom right, below WhatsApp */}
      <div className="hidden md:block z-40">
        <div className="relative">
          {/* Pulsing wave effect */}
          <div className="absolute inset-0 rounded-full bg-[#25d366] opacity-75 animate-ping"></div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 bg-[#25d366] text-white rounded-full shadow-lg hover:bg-[#25d366]/80 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t("request")}</span>
          </button>
        </div>
      </div>

      {/* Mobile version - positioned at bottom center, full width */}
      <div className="md:hidden fixed bottom-8 mb-1 mr-24 left-4 right-4 z-40">
        <div className="relative">
          {/* Pulsing wave effect */}
  
          <button
            onClick={() => setIsFormOpen(true)}
            className="relative w-full flex items-center justify-center gap-2 px-4 py-4 bg-[#25d366] text-white rounded-full shadow-lg hover:bg-[#25d366]/80 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t("request")}</span>
          </button>
        </div>
      </div>

      {/* Request Form Modal using existing Modal component */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} className="w-full max-w-md">
        <RequestForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          serviceType={serviceType}
          specificTypeId={specificTypeId}
        />
      </Modal>
    </>
  );
};

export default FloatingRequestButton;