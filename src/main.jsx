import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ClockProvider from "./context/ClockProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClockProvider>
      <App />
    </ClockProvider>
  </React.StrictMode>
);
