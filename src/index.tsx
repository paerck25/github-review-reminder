import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

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

Sentry.init({
    dsn: "https://a3a4b2d1dadc4114a3a21e736670f07b@o1182893.ingest.sentry.io/6299873",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0
});

ReactDOM.render(
    <HashRouter>
        <GlobalStyle />
        <App />
    </HashRouter>,
    document.getElementById("root")
);

reportWebVitals();
