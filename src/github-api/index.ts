import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios";
import { OrganizaionInfo, PullRequest, Repository, UserProfile } from "./types";

const _apiGet = async (endpoint: string, config?: AxiosRequestConfig) => {
    const { data } = await axiosInstance.get(endpoint, config);
    return data;
};

const _apiPost = async (endpoint: string, config?: AxiosRequestConfig) => {
    const { data } = await axiosInstance.post(endpoint, config);
    return data;
};

export const fetchMyUserProfile = async (): Promise<UserProfile> => {
    return await _apiGet("/user");
};

export const fetchMyOrganizationList = async (): Promise<OrganizaionInfo[]> => {
    return await _apiGet("/user/orgs");
};

export const fetchRepositoriesByOrg = async ({ org }: { org: string }): Promise<Repository[]> => {
    return await _apiGet(`/orgs/${org}/repos`);
};

export const fetchPullRequestsByRepo = async ({ full_name }: { full_name: string }): Promise<PullRequest[]> => {
    return await _apiGet(`/repos/${full_name}/pulls?timestamp=${new Date().getTime()}`);
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
    const organizations = await fetchMyOrganizationList();
    const orgNames = organizations?.map(org => org.login);
    const reposByOrg = await Promise.all(orgNames.map(name => fetchRepositoriesByOrg({ org: name })));
    const repoFullNames = reposByOrg.flat().map(repo => repo.full_name);
    const pullRequestsByRepo = await Promise.all(
        repoFullNames.map(name => fetchPullRequestsByRepo({ full_name: name }))
    );
    const pullRequests = pullRequestsByRepo.flat();
    return pullRequests;
};
