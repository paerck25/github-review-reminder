import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
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

    body::-webkit-scrollbar {
        width: 5px; 
    }

    body::-webkit-scrollbar-thumb {
        background: #57606a; 
        border-radius: 10px;
    }

    body::-webkit-scrollbar-track {
        display: none;
    }
`;

ReactDOM.render(
    <HashRouter>
        <GlobalStyle />
        <App />
    </HashRouter>,
    document.getElementById("root")
);

reportWebVitals();
