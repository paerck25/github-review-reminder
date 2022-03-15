import axios, { AxiosRequestConfig } from "axios";
import { OrganizaionInfo, UserProfile } from "./types";

const BASE_URL = "https://api.github.com";

const _apiGet = async (endpoint: string, config?: AxiosRequestConfig) => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(BASE_URL + endpoint, {
            headers: {
                Authorization: `token ${token}`
            },
            ...config
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

const _apiPost = async (endpoint: string, config?: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(BASE_URL + endpoint, {
        headers: {
            Authorization: `token ${token}`
        },
        ...config
    });
    return data;
};

export const getMyUserProfile = async (): Promise<UserProfile | undefined> => {
    return await _apiGet("/user");
};

export const getMyOrganizationList = async (): Promise<OrganizaionInfo[]> => {
    return await _apiGet("/user/orgs");
};

export const getRepositoriesByOrg = async ({ org }: { org: string }) => {
    return await _apiGet(`/orgs/${org}/repos`);
};

export const getPullRequestsByRepo = async ({ owner, repo }: { owner: string; repo: string }) => {
    return await _apiGet(`/repos/${owner}/${repo}/pulls`);
};

export const getReivewsByPull = async ({
    owner,
    repo,
    pull_number
}: {
    owner: string;
    repo: string;
    pull_number: number;
}) => {
    return await _apiGet(`/repos/${owner}/${repo}/pulls/${pull_number}/reviews`);
};

export const getReviewersByPull = async ({
    owner,
    repo,
    pull_number
}: {
    owner: string;
    repo: string;
    pull_number: number;
}) => {
    return await _apiGet(`/repos/${owner}/${repo}/pulls/${pull_number}/requested_reviewers`);
};
