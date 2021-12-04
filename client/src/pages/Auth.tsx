import React, { useEffect } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import axios from "axios";
const Auth = () => {
    const location = useLocation();

    useEffect(() => {
        const query = queryString.parse(location.search);
        const code = query.code;
        if (code) {
            getAccessToken(code as string).then(res => {
                console.log(res);
            });
        }
    }, []);

    const getAccessToken = async (code: string) => {
        const { data } = await axios.post("/auth", {
            code: code
        });
        return data;
    };

    return <h1>auth</h1>;
};

export default Auth;
