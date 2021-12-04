import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Login from "./pages/Login";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
        </Routes>
    );
};

export default Navigation;
