import React from "react";
import styled from "styled-components";
import { OrganizaionInfo } from "../github-api/types";

interface ListItemProps {
    organization: OrganizaionInfo;
}

const ListItem = ({ organization }: ListItemProps) => {
    return (
        <Container>
            <IconWrap>
                <Icon src={organization.avatar_url} alt="icon" />
            </IconWrap>
            <CardWrap>
                <Title>{organization.login}</Title>
                <Card></Card>
            </CardWrap>
        </Container>
    );
};

export default ListItem;

const Container = styled.div`
    display: flex;
    padding: 16px 0px;
    border-bottom: 1px solid #d0d7de;
`;

const IconWrap = styled.span`
    margin-right: 8px;
`;

const Icon = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(27, 31, 36, 0.15);
`;

const Title = styled.div`
    font-size: 14px;
    line-height: 32px;
    color: #24292f;
`;

const CardWrap = styled.div`
    flex: 1;
`;

const Card = styled.div`
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    padding: 16px;
`;
