import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import LoadingSpinner from "./components/LoadingSpinner";
import Router from "./Router";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true
        }
    }
});

function App() {
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
