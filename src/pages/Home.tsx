import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Header from "../components/Header";
import { getMyOrganizationList, getMyUserProfile } from "../github-api";
import { UserProfile } from "../github-api/types";

const Home = () => {
    const { data, isLoading, error, isFetching } = useQuery("myUserProfile", getMyUserProfile);
    const {
        data: orgData,
        isLoading: orgLoading,
        error: orgError,
        isFetching: orgIsFetching
    } = useQuery("myOrganizations", getMyOrganizationList);

    useEffect(() => {
        console.log(orgError);
        console.log(orgData);
    }, [orgData, orgError]);

    if (isLoading) {
        return <h1>로딩중..</h1>;
    }

    return (
        <RootContainer>
            <Header userProfile={data as UserProfile} />
            <BodyContainer>
                <ReviewCard />
            </BodyContainer>
        </RootContainer>
    );
};

export default Home;

const RootContainer = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const BodyContainer = styled.div`
    padding: 16px;
    border: 1px solid red;
`;

const ReviewCard = styled.div`
    width: 100%;
    height: 76px;
    background-color: #ffffff;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    padding: 16px;
`;
