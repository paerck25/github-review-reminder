import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ListItem from "../components/ListItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMyProfile } from "../github-api/useMyProfile";
import { usePullRequests } from "../github-api/usePullReuqests";
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
    const { data: myUserProfile } = useMyProfile();

    const { data: pullRequests, refetch } = usePullRequests({
        enabled: !!myUserProfile,
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: true
    });

    const reviews = useMemo(() => {
        const my_reviews: Review[] = [];
        pullRequests?.forEach(pr => {
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
    }, [pullRequests, myUserProfile]);

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
            return <CenterContainer>?????? ????????? ???????????? ????????????.</CenterContainer>;
        }
        return reviews.map((review, index) => {
            return <ListItem key={index} review={review} />;
        });
    }, [reviews, isRefetching]);

    return (
        <Container>
            <Header>
                ?????? {reviews?.length || 0} ???<Refresh onClick={onClickRefetch}>????????????</Refresh>
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
