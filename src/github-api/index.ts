import axios, { AxiosRequestConfig } from "axios";
import { OrganizaionInfo, PullRequest, Repository, UserProfile } from "./types";

const BASE_URL = "https://api.github.com";

const _apiGet = async (endpoint: string, config?: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(BASE_URL + endpoint, {
        headers: {
            Authorization: `token ${token}`
        },
        ...config
    });
    return data;
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

export const getMyUserProfile = async (): Promise<UserProfile> => {
    return await _apiGet("/user");
};

export const getMyOrganizationList = async (): Promise<OrganizaionInfo[]> => {
    return await _apiGet("/user/orgs");
};

export const getRepositoriesByOrg = async ({ org }: { org: string }): Promise<Repository[]> => {
    return await _apiGet(`/orgs/${org}/repos`);
};

export const getPullRequestsByRepo = async ({ full_name }: { full_name: string }): Promise<PullRequest[]> => {
    return await _apiGet(`/repos/${full_name}/pulls`);
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

export const fetchPullRequest = async () => {
    const organizations = await getMyOrganizationList();
    const orgNames = organizations?.map(org => org.login);
    const reposByOrg = await Promise.all(orgNames.map(name => getRepositoriesByOrg({ org: name })));
    const repoFullNames = reposByOrg.flat().map(repo => repo.full_name);
    const pullRequestsByRepo = await Promise.all(repoFullNames.map(name => getPullRequestsByRepo({ full_name: name })));
    const pullRequests = pullRequestsByRepo.flat();
    return pullRequests;
};
