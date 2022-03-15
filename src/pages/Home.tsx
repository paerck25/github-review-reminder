import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import LoadingSpinner from "../components/LoadingSpinner";
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
        return (
            <CenterContainer>
                <LoadingSpinner />
            </CenterContainer>
        );
    }

    return (
        <RootContainer>
            <Header userProfile={data as UserProfile} />
            <BodyContainer>
                {orgData?.map(org => {
                    return <ListItem key={org.id} organization={org} />;
                })}
                {orgData?.map(org => {
                    return <ListItem key={org.id} organization={org} />;
                })}
                {orgData?.map(org => {
                    return <ListItem key={org.id} organization={org} />;
                })}
                {orgData?.map(org => {
                    return <ListItem key={org.id} organization={org} />;
                })}
            </BodyContainer>
        </RootContainer>
    );
};

export default Home;

const CenterContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RootContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const BodyContainer = styled.div`
    padding: 16px;
`;
