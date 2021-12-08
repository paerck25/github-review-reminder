import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { getMyUserProfile } from "../github-api";
import { CLIENT_ID, CLIENT_SECRET } from "../constant";
const electron = window.require("electron");

type AccessToken = {
    access_token: string;
    token_type: string;
    scope?: string;
};

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState("");

    useEffect(() => {
        const query = queryString.parse(location.search);
        const code = query.code;
        if (code) {
            electron.ipcRenderer.send("auth", { code: code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET });
            electron.ipcRenderer.on("access_code", (e: any, arg: AccessToken) => {
                localStorage.setItem("token", `${arg.access_token}`);
                setToken(arg.access_token);
            });
        } else {
            navigate("/", { replace: true });
        }
    }, []);

    useEffect(() => {
        if (token) {
            getMyUserProfile()
                .then(res => {
                    if (res) {
                        console.log(res);
                        navigate("/home", { replace: true });
                    }
                })
                .catch(err => {
                    if (err instanceof Error) {
                        console.log(err.message);
                        localStorage.removeItem("token");
                        navigate("/", { replace: true });
                    }
                });
        }
    }, [token]);

    return <h1>auth</h1>;
};

export default Auth;
