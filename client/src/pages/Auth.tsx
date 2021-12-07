import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import axios from "axios";
import { getMyUserProfile } from "../github-api";

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
            getAccessToken(code as string).then(({ data }: { data: AccessToken }) => {
                if (data) {
                    localStorage.setItem("token", `${data.access_token}`);
                    setToken(data.access_token);
                }
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

    const getAccessToken = async (code: string) => {
        const { data } = await axios.post("/auth", {
            code: code
        });
        return data;
    };

    return <h1>auth</h1>;
};

export default Auth;
