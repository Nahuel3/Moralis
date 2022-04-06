import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./style.scss";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://ispokfmba8bl.usemoralis.com:2053/server" appId="1F5BbKaPGaYX59TE10R3yxY0wEyxeRgcNhR0TYiM">
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
