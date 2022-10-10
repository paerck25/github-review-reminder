import React from "react";
import styled from "styled-components";
import { Review } from "../pages/Home";
import { convertDate, openBrowser } from "../utils/utils";

interface ListItemProps {
    review: Review;
}

const ListItem = ({ review }: ListItemProps) => {
    return (
        <Container>
            <IconWrap onClick={openBrowser.bind(null, `https://github.com/${review.org_name}`)}>
                <Icon src={review.org_avater} alt="icon" />
            </IconWrap>
            <CardWrap>
                <Title onClick={openBrowser.bind(null, `https://github.com/${review.repo_name}`)}>
                    {review.repo_name}
                </Title>
                <CardSubTitle>{` - opend by ${review.pr_author}`}</CardSubTitle>
                <Card onClick={openBrowser.bind(null, review.pr_url)}>
                    <CardTitle>{review.pr_title}</CardTitle>
                    <CardDescription>
                        <div dangerouslySetInnerHTML={{ __html: review.pr_body }} />
                    </CardDescription>
                    <CardSubDescription>{`Updated ${convertDate(review.pr_updated_at)}`}</CardSubDescription>
                </Card>
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
    cursor: pointer;
`;

const Icon = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(27, 31, 36, 0.15);
`;

const Title = styled.span`
    font-size: 14px;
    line-height: 32px;
    color: #24292f;
    cursor: pointer;
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
    cursor: pointer;
`;

const CardTitle = styled.div`
    font-size: 16px;
    color: #24292f;
    font-weight: bold;
`;

const CardSubTitle = styled.span`
    font-size: 12px;
    color: #57606a;
`;

const CardDescription = styled.div`
    margin-top: 16px;
    font-size: 14px;
    color: #57606a;

    & li {
        display: block;
    }
`;

const CardSubDescription = styled.div`
    margin-top: 16px;
    font-size: 12px;
    color: #57606a;
`;
