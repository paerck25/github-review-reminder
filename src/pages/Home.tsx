import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import ListItem from "../components/ListItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchPullRequest, fetchMyUserProfile } from "../github-api";
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
    const [isRefetching, setIsRefetching] = useState(false);
    const { data: myUserProfile } = useQuery("myUserProfile", fetchMyUserProfile);
    const { data: reviews, refetch } = useQuery("pullRequests", fetchPullRequest, {
        enabled: !!myUserProfile,
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: true,
        select: data => {
            const my_reviews: Review[] = [];
            data.forEach(pr => {
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
            return my_reviews;
        }
    });

    const onClickRefetch = () => {
        setIsRefetching(true);
        refetch().finally(() => {
            setIsRefetching(false);
            sendNotification();
        });
    };

    const sendNotification = () => {
        electron.ipcRenderer.send("review_notification", { review_count: reviews?.length || 0 });
    };

    useEffect(() => {
        sendNotification();
        const intervalId = setInterval(() => {
            sendNotification();
        }, 300000);
        return () => {
            clearInterval(intervalId);
        };
    }, [reviews]);

    const renderReviews = useMemo(() => {
        if (isRefetching) {
            return (
                <CenterContainer>
                    <LoadingSpinner />
                </CenterContainer>
            );
        }
        if (!reviews || reviews?.length === 0) {
            return <CenterContainer>리뷰 요청이 존재하지 않습니다.</CenterContainer>;
        }
        return reviews.map((review, index) => {
            return <ListItem key={index} review={review} />;
        });
    }, [reviews, isRefetching]);

    return (
        <Container>
            <Header>
                요청 {reviews?.length || 0} 건<Refresh onClick={onClickRefetch}>새로고침</Refresh>
            </Header>
            {renderReviews}
        </Container>
    );
};

export default Home;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CenterContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #57606a;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #57606a;
`;

const Refresh = styled.div`
    cursor: pointer;
`;
