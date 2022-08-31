import "./polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
//
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
import "rc-slider/assets/index.css";

//
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { persistor, store } from "app/store";
import { PersistGate } from "redux-persist/integration/react";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

// Public RPC node
// const REACT_APP_MUMBAI_RPC = "https://rpc-mumbai.maticvigil.com" as string;
// Private RPC Network
const REACT_APP_MUMBAI_RPC =
  "https://polygon-mumbai.infura.io/v3/752bc8c08f3f44fab98842c4cec921ca" as string;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThirdwebProvider
        desiredChainId={ChainId.Mumbai}
        chainRpc={{
          [ChainId.Mumbai]: REACT_APP_MUMBAI_RPC,
        }}
      >
        <App />
      </ThirdwebProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
