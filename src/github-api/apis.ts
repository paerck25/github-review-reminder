import { gql } from "graphql-request";
import { graphqlRequest } from "./graphql-request";
import { User } from "./types/graphqlTypes";

const viewerQuery = gql`
    query {
        viewer {
            login
            name
            avatarUrl
        }
    }
`;

export const queryMyProfile = async (): Promise<{ viewer: User }> => {
    return graphqlRequest(viewerQuery);
};

const reviewQuery = gql`
    query {
        viewer {
            login
            organizations(first: 5) {
                nodes {
                    avatarUrl
                    login
                    repositories(first: 10, orderBy: { direction: DESC, field: PUSHED_AT }) {
                        nodes {
                            name
                            pullRequests(first: 10, states: [OPEN], orderBy: { direction: DESC, field: CREATED_AT }) {
                                nodes {
                                    title
                                    body
                                    bodyHTML
                                    bodyText
                                    author {
                                        login
                                    }
                                    url
                                    updatedAt
                                    reviewRequests(first: 20) {
                                        nodes {
                                            requestedReviewer {
                                                ... on User {
                                                    login
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const queryReviews = (): Promise<{ viewer: User }> => {
    return graphqlRequest(reviewQuery);
};
