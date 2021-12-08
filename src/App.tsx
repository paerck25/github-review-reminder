import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navigation from "./Navigation";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Navigation />
        </QueryClientProvider>
    );
}

export default App;
