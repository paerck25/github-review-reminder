import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import ListItem from "../components/ListItem";
import { fetchPullRequest, getMyUserProfile } from "../github-api";
const electron = window.require("electron");

export interface Review {
    org_name: string;
    org_avater: string;
    repo_name: string;
    pr_url: string;
    pr_title: string;
    pr_body: string;
    pr_author: string;
    pr_updated_at: string;
}

const Home = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const { data: myUserProfile } = useQuery("myUserProfile", getMyUserProfile);
    const { data: pullRequests } = useQuery("pullRequests", fetchPullRequest);

    useEffect(() => {
        if (pullRequests) {
            const my_reviews: Review[] = [];
            pullRequests.forEach(pr => {
                const isWating = pr.requested_reviewers.find(reviewr => {
                    return reviewr.login === myUserProfile?.login;
                });
                if (isWating) {
                    my_reviews.push({
                        org_name: pr.base.repo.owner.login,
                        org_avater: pr.base.repo.owner.avatar_url,
                        repo_name: pr.base.repo.full_name,
                        pr_title: pr.title,
                        pr_body: pr.body,
                        pr_author: pr.user.login,
                        pr_updated_at: pr.updated_at,
                        pr_url: pr.html_url
                    });
                }
            });
            setReviews(my_reviews);
        }
    }, [pullRequests, myUserProfile]);

    useEffect(() => {
        if (reviews.length > 0) {
            electron.ipcRenderer.send("review_notification", { review_count: reviews.length });
        }
    }, [reviews]);

    const renderReviews = useMemo(
        () =>
            reviews.map((review, index) => {
                return <ListItem key={index} review={review} />;
            }),
        [reviews]
    );

    return (
        <Container>
            {renderReviews.length !== 0 ? (
                renderReviews
            ) : (
                <CenterContainer>리뷰 요청이 존재하지 않습니다.</CenterContainer>
            )}
        </Container>
    );
};

export default Home;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const CenterContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #57606a;
`;
