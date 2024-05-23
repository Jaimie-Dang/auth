import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* put Toast in here - Toast - make sure it's placed at the top*/}
    <Toaster position="top-left" />
    <App />
  </React.StrictMode>
);
