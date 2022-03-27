import React, { useEffect } from "react";
import styled from "styled-components";
import { GET_CODE_URL } from "../constant";
import { ReactComponent as GithubLogo } from "../assets/icons/github_logo_light.svg";
import Carousel from "../components/Carousel";
import ImageA from "../assets/images/org_access.png";
import { useNavigate } from "react-router-dom";
import { getMyUserProfile } from "../github-api";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getMyUserProfile()
                .then(res => {
                    navigate("/home", { replace: true });
                })
                .catch(e => {
                    console.log(e.message);
                    localStorage.removeItem("token");
                });
        }
    }, []);

    const githubLogin = () => {
        window.location.href = GET_CODE_URL;
    };

    return (
        <Container>
            <Carousel>
                <Carousel.Card>
                    <Description>{`팀원이 풀리퀘스트를 올렸는데\n바빠서 미루다 까먹은적 있지않나요?`}</Description>
                </Carousel.Card>
                <Carousel.Card>
                    <Description>{`내가 풀리퀘스트 올렸는데\n팀원의 리뷰가 늦어진적 있지않나요?`}</Description>
                </Carousel.Card>
                <Carousel.Card>
                    <Description>{`내가 해줘야 하는 리뷰가 어디에\n 있는지 찾는데 귀찮은적 없나요?`}</Description>
                </Carousel.Card>
                <Carousel.Card>
                    <Description>{`저는 그랬습니다.`}</Description>
                </Carousel.Card>
                <Carousel.Card>
                    <Description>{`그래서 만들었어요`}</Description>
                </Carousel.Card>
                <Carousel.Card>
                    <Title>리뷰 좀 해주세요.</Title>
                </Carousel.Card>
                <Carousel.Card>
                    <Description>{`사용하시려면 Organization\n Access 허용이 필요합니다.`}</Description>
                </Carousel.Card>
                <Carousel.Card>
                    <Image src={ImageA} />
                </Carousel.Card>
            </Carousel>
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

const Description = styled.div`
    color: #24292f;
    font-size: 20px;
    white-space: pre-wrap;
    text-align: center;
`;

const Title = styled.div`
    color: #24292f;
    font-weight: bold;
    font-size: 36px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;
