import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { CLIENT_ID, CLIENT_SECRET } from "../constant";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
const electron = window.require("electron");

type AccessToken = {
    access_token: string;
    token_type: string;
    scope?: string;
};

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = queryString.parse(location.search);
        const code = query.code;
        if (code) {
            electron.ipcRenderer.send("auth", { code: code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET });
            electron.ipcRenderer.on("access_code", (e: any, arg: AccessToken) => {
                localStorage.setItem("token", `${arg.access_token}`);
                navigate("/home", { replace: true });
            });
        } else {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
        }
    }, []);

    return (
        <Container>
            <LoadingSpinner />
        </Container>
    );
};

export default Auth;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
