import { AppShell } from "../components"
import { IconContext } from "react-icons";
import { color } from "../theme";
import { useEffect } from "react";

export default () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register("/service-worker.js", { scope: "/" })
          .then(function (registration) {
            console.log("SW registered: ", registration);
          })
          .catch(function (registrationError) {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
  }, []);

  return (
    <IconContext.Provider value={{ color: color["text-primary"] }}>
      <AppShell />
    </IconContext.Provider>
  );
};
