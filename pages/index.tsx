import { AppShell } from "../components"
import { IconContext } from "react-icons";
import { color } from "../theme";

export default () => (
    <IconContext.Provider value={{color: color["text-primary"]}}>
      <AppShell />
    </IconContext.Provider>
);
