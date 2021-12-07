import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
};

export default Navigation;
