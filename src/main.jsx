import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthHook from "./hook/AuthHook.jsx";

createRoot(document.getElementById("root")).render(
  <AuthHook>
    <App />
  </AuthHook>
);
