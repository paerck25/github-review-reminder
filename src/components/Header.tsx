import React from "react";
import styled from "styled-components";
import { UserProfile } from "../github-api/types";
import { ReactComponent as GithubLogo } from "../assets/icons/github_logo_light.svg";
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
            <GithubLogo onClick={() => openExternal(`https://github.com`)} />
            <UserAvatar
                src={userProfile.avatar_url}
                onClick={() => openExternal(`https://github.com/${userProfile.login}`)}
            />
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

const UserAvatar = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
`;
