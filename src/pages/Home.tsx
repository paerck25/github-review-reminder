import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMyUserProfile } from "../github-api";

const Home = () => {
    const { data, isLoading, error, isFetching } = useQuery("myUserProfile", getMyUserProfile);

    if (isLoading) {
        return <h1>로딩중..</h1>;
    }

    return (
        <UserContainer>
            <UserAvatar src={data?.avatar_url} />
            <UserName>ID : {data?.login}</UserName>
            <UserName>이름 : {data?.name}</UserName>
        </UserContainer>
    );
};

export default Home;

const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 97vh;
    border: 1px solid red;
`;

const UserAvatar = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 0.5px solid #ededed;
    margin-bottom: 10px;
`;

const UserName = styled.div`
    font-size: 14px;
    font-weight: bold;
`;
