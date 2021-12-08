import axios, { AxiosRequestConfig } from "axios";
import { UserProfile } from "./types";

const BASE_URL = "https://api.github.com";

const _apiGet = async (endpoint: string, config?: AxiosRequestConfig) => {
    const { data } = await axios.get(BASE_URL + endpoint, config);
    return data;
};

const _apiPost = async (endpoint: string, config?: AxiosRequestConfig) => {
    const { data } = await axios.post(BASE_URL + endpoint, config);
    return data;
};

export const getMyUserProfile = async (): Promise<UserProfile | undefined> => {
    const token = localStorage.getItem("token");
    return await _apiGet("/user", {
        headers: {
            Authorization: `token ${token}`
        }
    });
};

export const getMyOrganizationList = async () => {
    const token = localStorage.getItem("token");
    return await _apiGet("/user/orgs", {
        headers: {
            Authorization: `token ${token}`
        }
    });
};

export const getRepositoriesByOrg = async ({ org }: { org: string }) => {
    const token = localStorage.getItem("token");
    return await _apiGet(`/orgs/${org}/repos`, {
        headers: {
            Authorization: `token ${token}`
        }
    });
};

export const getPullRequestsByRepo = async ({ owner, repo }: { owner: string; repo: string }) => {
    const token = localStorage.getItem("token");
    return await _apiGet(`/repos/${owner}/${repo}/pulls`, {
        headers: {
            Authorization: `token ${token}`
        }
    });
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
    const token = localStorage.getItem("token");
    return await _apiGet(`/repos/${owner}/${repo}/pulls/${pull_number}/reviews`, {
        headers: {
            Authorization: `token ${token}`
        }
    });
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
    const token = localStorage.getItem("token");
    return await _apiGet(`/repos/${owner}/${repo}/pulls/${pull_number}/requested_reviewers`, {
        headers: {
            Authorization: `token ${token}`
        }
    });
};
