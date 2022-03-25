import React from "react";
import styled from "styled-components";
import { GET_CODE_URL } from "../constant";
import { ReactComponent as GithubLogo } from "../assets/icons/github_logo_light.svg";
import Carousel from "../components/Carousel";

const Login = () => {
    const githubLogin = () => {
        window.location.href = GET_CODE_URL;
    };

    return (
        <Container>
            <Carousel />
            <LoginButton onClick={githubLogin}>
                <LogoWrap>
                    <GithubLogo />
                </LogoWrap>
                Github 계정 연결
            </LoginButton>
        </Container>
    );
};

export default Login;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const LogoWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
`;

const LoginButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #24292f;
    border: none;
    border-radius: 6px;
    padding: 5px 16px;
    color: white;
    font-size: 28px;
    line-height: 32px;
    outline: none;
    cursor: pointer;
`;
