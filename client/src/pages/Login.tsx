import React from "react";
import axios from "axios";

const Login = () => {
    const githubLogin = () => {
        axios.get("/getLoginUrl").then(res => {
            const { data } = res;
            console.log(data);
            window.location.href = data.url;
        });
    };

    return <button onClick={githubLogin}>깃허브로 로그인</button>;
};

export default Login;
