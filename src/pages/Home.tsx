import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ListItem from "../components/ListItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQueryViewer } from "../github-api/hooks/useQueryViewer";
import { User } from "../github-api/types/graphqlTypes";
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

    const { data: viewerData, refetch } = useQueryViewer({
        staleTime: 300000,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: true
    });

    const reviews = useMemo(() => {
        const my_reviews: Review[] = [];
        if (!viewerData) return [];
        const { viewer } = viewerData;
        const { organizations, login: viewerLogin } = viewer;
        organizations?.nodes?.forEach(org => {
            if (!org) return;
            const { avatarUrl: orgAvatar, login: orgLogin, repositories } = org;
            repositories?.nodes?.forEach(repo => {
                if (!repo) return;
                const { name: repoName, pullRequests } = repo;
                pullRequests.nodes?.forEach(pr => {
                    if (!pr) return;
                    const {
                        title: prTitle,
                        bodyHTML: prBody,
                        author: prAuthor,
                        reviewRequests,
                        updatedAt: prUpdatedAt,
                        url: prUrl
                    } = pr;
                    reviewRequests?.nodes?.forEach(review => {
                        if (!review) return;
                        const requestedReviewer = review.requestedReviewer as User;
                        if (!requestedReviewer) return;
                        if (requestedReviewer.login === viewerLogin) {
                            my_reviews.push({
                                org_name: orgLogin,
                                org_avater: orgAvatar,
                                repo_name: repoName,
                                pr_title: prTitle,
                                pr_body: prBody,
                                pr_author: prAuthor?.login || "null",
                                pr_updated_at: prUpdatedAt,
                                pr_url: prUrl
                            });
                        }
                    });
                });
            });
        });
        return my_reviews;
    }, [viewerData]);

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
