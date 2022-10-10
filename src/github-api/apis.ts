import { AxiosRequestConfig } from "axios";
import { gql } from "graphql-request";
import axiosInstance from "./axios";
import { graphqlRequest } from "./graphql-request";
import { User } from "./types/graphqlTypes";
import { UserProfile } from "./types/types";

const _apiGet = async (endpoint: string, config?: AxiosRequestConfig) => {
    const { data } = await axiosInstance.get(endpoint, config);
    return data;
};

export const fetchMyUserProfile = async (): Promise<UserProfile> => {
    return await _apiGet("/user");
};

const query = gql`
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

export const queryViewer = async (): Promise<{ viewer: User }> => {
    return await graphqlRequest(query);
};
