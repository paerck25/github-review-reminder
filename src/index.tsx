import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *   {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        user-select: none;
    }

    body {
        background-color: #F6F8FA;
    }
`;

ReactDOM.render(
    <BrowserRouter>
        <GlobalStyle />
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

reportWebVitals();
