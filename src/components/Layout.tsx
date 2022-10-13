import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMyProfile } from "../github-api/hooks/useMyProfile";
import { User } from "../github-api/types/graphqlTypes";

const Layout = () => {
    const { data: userProfile } = useMyProfile();

    return (
        <RootContainer>
            <Header userProfile={userProfile?.viewer as User} />
            <BodyContainer>
                <Suspense
                    fallback={
                        <CenterContainer>
                            <LoadingSpinner />
                        </CenterContainer>
                    }>
                    <Outlet />
                </Suspense>
            </BodyContainer>
        </RootContainer>
    );
};

export default Layout;

const RootContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const CenterContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BodyContainer = styled.div`
    flex: 1;
    padding: 16px;
`;
