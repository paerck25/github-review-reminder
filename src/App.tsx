import React, { Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "@sentry/react";
import styled from "styled-components";
import LoadingSpinner from "./components/LoadingSpinner";
import FallbackError from "./components/FallbackError";
import useElectronEvent from "./hooks/useElectronEvent";
import Router from "./Router";
import { queryMyProfile } from "./github-api/apis";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            refetchInterval: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchIntervalInBackground: false
        }
    }
});

function App() {
    const navigate = useNavigate();
    useElectronEvent(navigate);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            queryMyProfile()
                .then(res => {
                    navigate("/home", { replace: true });
                })
                .catch(e => {
                    console.log(e.message);
                    localStorage.removeItem("token");
                    navigate("/", { replace: true });
                });
        } else {
            navigate("/", { replace: true });
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary fallback={<FallbackError />}>
                <Suspense
                    fallback={
                        <CenterContainer>
                            <LoadingSpinner />
                        </CenterContainer>
                    }>
                    <Router />
                </Suspense>
            </ErrorBoundary>
        </QueryClientProvider>
    );
}

export default App;

const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;
