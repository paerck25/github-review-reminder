import React from "react";
import styled from "styled-components";
import { GET_CODE_URL } from "../constant";
import { ReactComponent as GithubLogo } from "../assets/icons/github_logo_light.svg";

const Login = () => {
    const githubLogin = () => {
        window.location.href = GET_CODE_URL;
    };

    return (
        <Container>
            <Title>리뷰 좀 해주세요.</Title>
            <Description>{`팀원이 풀리퀘스트를 올렸는데\n바빠서 미루고 까먹은적 있지않나요?`}</Description>
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

const Title = styled.div`
    color: #24292f;
    font-weight: bold;
    font-size: 36px;
    margin-bottom: 12px;
`;

const Description = styled.div`
    color: #24292f;
    font-size: 20px;
    margin-bottom: 20px;
    white-space: pre-wrap;
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
