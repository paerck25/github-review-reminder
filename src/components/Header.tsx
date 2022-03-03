import React from "react";
import styled from "styled-components";
import { UserProfile } from "../github-api/types";
const electron = window.require("electron");

interface HeaderProps {
    userProfile: UserProfile;
}

const Header = ({ userProfile }: HeaderProps) => {
    const openExternal = (href: string) => {
        electron.shell.openExternal(href);
    };

    return (
        <Container>
            <LogoIcon
                src={userProfile.avatar_url}
                onClick={() => openExternal(`https://github.com/${userProfile.login}`)}
            />
            <UserAvatar src={userProfile.avatar_url} />
        </Container>
    );
};

export default Header;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #24292f;
    padding: 16px;
`;

const LogoIcon = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;

const UserAvatar = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;
