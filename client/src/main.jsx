import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// importing Context
// ContextProvider > TransactionProvider
import { TransactionProvider } from "./context/TransactionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrapping up the entire React project with the ContextProvider to access Blockchain data everywhere !
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>
);
