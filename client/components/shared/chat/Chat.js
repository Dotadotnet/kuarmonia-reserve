import React from "react";
import WhatsAppLink from "../button/WhatsAppLink";

function Chat() {
  return (
    <div className="fixed bottom-4 right-4  w-20 h-20 z-50 flex items-center justify-center p-2   rounded-full cursor-pointer transition-transform transform hover:scale-110">
      <WhatsAppLink />
    </div>
  );
}

export default Chat;
