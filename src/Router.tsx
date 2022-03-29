import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Router = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
};

export default Router;
