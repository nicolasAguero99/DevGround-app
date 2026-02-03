import ReactDOM from "react-dom/client";
import App from "./App";
import { clearAllPersistedState } from "./utils/utils";

if (typeof window !== "undefined") {
  (window as Window & { clearAllPersistedState?: () => Promise<void> }).clearAllPersistedState = clearAllPersistedState;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
