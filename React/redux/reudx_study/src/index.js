import React from "react";
// import ReactDOM from 'react-dom'; //구버전
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from './store.js' //configureStore 받아오는 것인데 작명을 store로 함

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  // provider로 감싸줘서 App/ 컴포넌트들이 state 사용가능
  <Provider store={store}>
    <App />
  </Provider>
);
