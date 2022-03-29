import React, { Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./components/LoadingSpinner";
import { getMyUserProfile } from "./github-api";
import useElectronEvent from "./hooks/useElectronEvent";
import Router from "./Router";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true
        }
    }
});

function App() {
    const navigate = useNavigate();
    useElectronEvent(navigate);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getMyUserProfile()
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
            <Suspense
                fallback={
                    <CenterContainer>
                        <LoadingSpinner />
                    </CenterContainer>
                }>
                <Router />
            </Suspense>
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
