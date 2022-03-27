import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

const Router = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    );
};

export default Router;
