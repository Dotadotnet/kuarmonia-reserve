import { useEffect } from "react";

const TidioChat = () => {
  useEffect(() => {
    (function() {
      var script = document.createElement("script");
      script.src = "https://code.tidio.co/xskwcr861bzoyuncqlnfqxzfzfcb1uky.js";
      script.async = true;
      document.body.appendChild(script);
    })();
  }, []);

  return null;
};

export default TidioChat;
