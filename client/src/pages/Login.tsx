import React from "react";
import { GET_CODE_URL } from "../constant";

const Login = () => {
    const githubLogin = () => {
        window.location.href = GET_CODE_URL;
    };

    return <button onClick={githubLogin}>깃허브로 로그인</button>;
};

export default Login;
