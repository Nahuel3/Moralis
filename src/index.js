import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://ispokfmba8bl.usemoralis.com:2053/server" appId="159.89.113.7:56728">
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
